import * as yaml from 'yaml'
import { json2xml, xml2json } from 'xml-js'

export function formatJson(input, indent = 2) {
  const parsed = JSON.parse(input)
  return JSON.stringify(parsed, null, indent)
}

export function formatXml(input, indent = 2) {
  const options = {
    compact: false,
    ignoreComment: true,
    spaces: indent
  }
  const json = xml2json(input, options)
  const parsed = JSON.parse(json)
  return json2xml(parsed, options)
}

export function formatYaml(input, indent = 2) {
  const doc = yaml.parseDocument(input)
  return doc.toString({
    indent: indent,
    simpleKeys: false,
    lineWidth: 0
  })
}