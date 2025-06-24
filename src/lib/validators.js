import * as yaml from 'yaml'
import { xml2json } from 'xml-js'

export function validateJson(input) {
  try {
    JSON.parse(input)
    return ''
  } catch (err) {
    return `JSON Error: ${err.message}`
  }
}

export function validateXml(input) {
  try {
    xml2json(input, { compact: false })
    return ''
  } catch (err) {
    return `XML Error: ${err.message}`
  }
}

export function validateYaml(input) {
  try {
    yaml.parse(input)
    return ''
  } catch (err) {
    return `YAML Error: ${err.message}`
  }
}