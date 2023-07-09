#!/usr/bin/python3

import re

pattern = re.compile(r'^([\d]{4,4})\-\d\d\-\d\d,(.+),(.+),(.\d+),(\d+),.*$')
f = open("./resultsFutball.csv")

for line in f:
    res = re.match(pattern, line)
    if res:
        total = int(res.group(4)) + int(res.group(5))
        if total > 30:
            print(f"goles: {total} , {res.group(1)}, {res.group(2)} VS {res.group(3)} [{res.group(4)}-{res.group(5)}]")

f.close()