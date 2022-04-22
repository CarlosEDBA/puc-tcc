export default {
  "definitions": {},
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/root.json",
  "type": "object",
  "title": "Usuario",
  "required": [
    "nome",
    "sobrenome",
    "email",
    "senha",
    "telefone",
  ],
  "properties": {
    "nome": {
      "$id": "#/properties/nome",
      "type": "string",
      "minLength": 2
    },
    "sobrenome": {
      "$id": "#/properties/sobrenome",
      "type": "string",
      "minLength": 1
    },
    "email": {
      "$id": "#/properties/email",
      "type": "string",
      "minLength": 10
    },
    "senha": {
      "$id": "#/properties/senha",
      "type": "string",
      "minLength": 6
    },
    "telefone": {
      "$id": "#/properties/telefone",
      "type": "string",
      "minLength": 10
    }
  }
}