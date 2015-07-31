# file-encoder

[file-encoder](https://github.com/leungwensen/zfinder) is a script that uses libicu to detect file encoding & uses iconv to convert files' encoding.

you do not have to know the original encoding of the file to finish encoding.

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

## Thanks to

file-encoder is made possible by all these fantastic projects:

* [mooz/node-icu-charset-detector](https://github.com/mooz/node-icu-charset-detector)
* [ashtuchkin/iconv-lite](https://github.com/ashtuchkin/iconv-lite)
* [substack/minimist](https://github.com/substack/minimist)


