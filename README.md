# file-encoder

[file-encoder](https://github.com/leungwensen/zfinder) is a script that uses libicu to detect file encoding & uses iconv to convert files' encoding.

you DO NOT have to know the original encoding of the file to finish the converting

## Usage

<b>NOTE: install iconv & [ICU](https://github.com/mooz/node-icu-charset-detector#installing-icu) first if you haven't.</b>

```shell
npm install file-encoder -g
file-encoder -h
```

* use case: convert a file's encoding to `utf8`

```
file-encoder -f ${filename}
```

* use case: convert a file's content to `utf8` and write to another file

```
file-encoder -f ${filename} -t ${targetFilename}
```

* use case: convert all files' encoding to `gbk` in a directory

```
file-encoder -d ${directory} -e gbk
```

* use case: convert all files' encoding to `utf8` in a directory recursively

```
file-encoder -d ${directory} -r
```

* use case: convert all files' encoding to `utf8` in a directory recursively excluding some paths

```
file-encoder -d ${directory} -r --exclude node_modules --exclude test --exclude dev
```

* use case: convert encoding of all files with specified extnames to `utf8` in a directory

```
file-encoder -d ${directory} --extname js --extname css --extname html
```

## Thanks to

file-encoder is made possible by all these fantastic projects:

* [ashtuchkin/iconv-lite](https://github.com/ashtuchkin/iconv-lite)
* [mooz/node-icu-charset-detector](https://github.com/mooz/node-icu-charset-detector)
* [substack/minimist](https://github.com/substack/minimist)


