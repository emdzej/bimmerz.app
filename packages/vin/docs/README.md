# How BMW VIN is encoded in MS4x ECU

Normal VIN consists of 17 alphanumeric characters. The way the characters 
are structured depends mostly on the manufacturer. 

However, the way BMW decided to store VIN in their ECUs is not standard.
Why - hard to say, likely the reason was not to save space - since their way
saves only 3 bytes - but rather to obfuscate the data and make it slightly harder to modify.

Who knows...

## Character Encoding

VIN consists of upper case letters from latin alphabet and digits.

Digits `0` - `9` are encoded as values `0x00` - `0x09`. Letters `A` - `Z` are encoded as values `0x0A` - `0x23` (e.g. `7` is `0x07`, `G` is `0x10`, etc.).

## VIN Encoding

Maximal value of `0x23` means each character occupies only 6 bits in a byte, therefore the entire VIN value can be "compressed" by storing some bits in the unused ones. This way 17 character VIN becomes 13 bytes.

First character is always stored as is in the first byte of the binary VIN.

Since each character is 6 bits of data, 3 full bytes are used to store 4 characters.

While thinking about the encoding it's easier to think of the remaining 16 characters as 4 groups of 4 characters, which translates to 4 groups of 3-byte - tuples.  The schema repeats in every group. 

### The 3-byte Tuple

Let's take a `XXXX` as an example to process.
It'll be easier to see since `X` is encoded as `0x21` which is `0b000100001` - a value easy to track while bit shifting.

Here's our tuple in binary form before any character is placed inside:

```
tuple = 00000000 00000000 00000000
```

Let's think of that value as a 24 bit unsigned integer

First character of the group is always stored in the first byte's 6 most significant bits. This makes space for 2 bits from the next character.

This means that we can store it in the tuple as `tuple = tuple | (char1 << 18)`.

```
tuple = 10000100 00000000 00000000
```

Second character's 2 most significant bits are stored in tuple's first byte's 2 least significant bits, and remaining 4 bits in upper half of second byte of the tuple, which translated to `tuple = tuple | (char2 << 12)`.

```
tuple = 10000110 00010000 00000000
```

You get the drill. 

Third character is stored by adding it to the tuple as `tuple = tuple | (char3 << 6)`.

```
tuple = 10000110 00011000 01000000
```

And lastly - fourth character by adding it by doing `tuple = tuple | char4`.

```
tuple = 10000110 00011000 01100001
```

And that's it. Repeat the process for all 4-charater groups. There should be 13 bytes in total at the end. Take hexadecimal representation of the bytes, and you can input it into TunerPro or similar when editing firmware.

VIN `XXXXXXXXXXXXXXXXX` is `21 86 18 61 86 18 61 86 18 61 86 18 61`.

## VIN Decoding

It's exactly the opposite of encoding ;) 