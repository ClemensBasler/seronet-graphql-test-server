// @ts-check
import {
  find,
  propEq,
  compose,
  lensProp,
  over,
  map,
  defaultTo,
  unless,
  prop,
  isNil
} from 'ramda'

const findById = compose(
  find,
  propEq('componentId')
)

const langOrDef = compose(
  prop,
  defaultTo('en')
)

const propByLang = pname => lang => over(lensProp(pname), langOrDef(lang))
const nameByLang = propByLang('name')
const sectionNameByLang = lang =>
  over(lensProp('sections'), map(nameByLang(lang)))
const sectionFieldNameByLang = lang =>
  over(
    lensProp('sections'),
    map(over(lensProp('fields'), map(nameByLang(lang))))
  )

export const Query = {
  info: () => 'This is a public GraphQL API for SeRoNet',
  supportedLanguages: () => [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'German' }
  ],
  getDatasheet: (parent, args, context) => {
    const { db } = context
    const { componentId, lang } = args
    return compose(
      unless(
        isNil,
        compose(
          // language transforms
          sectionNameByLang(lang),
          sectionFieldNameByLang(lang)
        )
      ),
      findById(componentId)
    )(db)
  }
}
