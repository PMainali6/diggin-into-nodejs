# Getting Started

This is a accompanying git repo for the digging into node.js course by Kiyle,
the exercise are done here for the practise.

# Pre-requisite

```bash

    npm install
    # to make files executables
    chmod +x <filename>

```

# Ex 1

creating a simple cmd-line program using javascript,
using various node packages that comes built-in, and some external dependencies
`---file=<filename> --out=<boolean> --in=<boolean> `

```bash

    BASE_PATH=files/ ./cmdline-ex1.js --file=hello.txt --out

```

# Ex 2

creating readable and writeable streams, an efficient approach for processing
large data, to read and write data to and from the disk and the stdin / stdout

using zlib to compress and uncompress the stream

```bash

    BASE_PATH=files/ ./stream-ex2.js --file=hello.txt --compress

```

# Ex 3

determining the end of stream

```bash

    BASE_PATH=files/ ./stream-ex3.js --file=hello.txt --compress

```
