***
<p align="center">
  <a href="https://glossary.ai4bharat.org"><img src="https://github.com/AI4Bharat/Indic-Glossary-Explorer/blob/master/docs/images/Indic-Glossary-Explorer-Logo.png" alt="Indic Glossary Explorer" width="900" height="220"></a>
</p>

<p align="center">
    <a href="https://opensource.org/licenses/MIT" target="_blank">
        <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License: MIT">
    </a>
</p>

***

## Overview
In general terms, glossary is defined as a list of terms in a special domain or area of usage, with accompanying definitions. In the translation context, glossary can be defined as a pair which is associated with a field of knowledge, source being in one language and the target being in another language.

Ex : `{Appellant, अपीलकर्ता}` can be a pair under the en-hi glossary for the judicial domain. 

Such glossary helps the Translation/Annotations systems to make effective translation based on the context and domain.

## Frontend
The UI for the explorer is kept simple. We can search for a particular glossary term by providing a language (mandatory) and domain (optional).

<p align="center">
  <img src="https://github.com/AI4Bharat/Indic-Glossary-Explorer/blob/master/docs/images/glossary-explorer-ui.png"  width="1000" height="650">
</p>

The logged in version provides option to add a glossary. Both individual or batch upload is supported.


## Architecture
<p align="center">
  <img src="https://github.com/AI4Bharat/Indic-Glossary-Explorer/blob/master/docs/images/Glossary-service.png"  width="800" height="350">
</p>


## General Requirements
* Any create glossary request should follow the json schema
```
  {
    "srcLanguage": "en",
    "tgtLanguage": "hi",
    "srcText": "Appellant",
    "tgtText": "अपीलकर्ता",
    "domain" : "legal",
    "collectionSource" : "Anuvaad",
    "level" : "w"
  }
```
*    Bulk upload takes a file of type xls/xlsx/csv/tsv




# API Specs

## Context path
`/glossary-explorer`


## Endpoints
* Create glossary   `/v1/glossary/create`

  This api takes list of json objects as input to store them in the db

* Glossary file upload `/v1/glossary/file/upload`

  This api takes a file of type Xls/Xlsx/Csv/tsv to uplaod glossaries in bulk into the db

* Search glossary  `/v1/sentence/phrases/search`

  This api takes in a list of Phrases/sentences as input to retrive all the possible glossaries from the db 


  
  
   
## Installing / Getting started
A quick intro on how to get started with running the glossary application on your machine



### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/AI4Bharat/Glossary-App.git
cd Glossary-App/
```

# Code Run
Start elastic search server by running the following commond in the elastic search directory on your local machine


```
bin\elasticsearch.bat   
```
Make sure our are in the project directory and run the following command

```
Python app.py 
```

# API Specifications
[`SwaggerHub Link`](https://app.swaggerhub.com/apis/ai4bharat-iitm/indic-glossary-explorer/1.0.0)
