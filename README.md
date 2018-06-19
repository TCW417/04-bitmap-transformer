https://travis-ci.org/TCW417/04-bitmap-transformer.svg?branch=master)](https://travis-ci.org/TCW417/04-bitmap-transformer)

Describe the exported values of each module you have defined. Every function description should include it's arity (expected number of parameter), the expected data for each parameter (data-type and limitations), and it's behavior (for both valid and invalued use).

buildPixelArray

Arity - 0
Use: builds our array of pixels that we can manipulate
pixelRows.get24bitPixelRow

Arity - 1
Parameter data type - array
Expected data - an array that is our pixelRow
pixelRows.write24bitPixelTable

Arity - 2
Parameters - bitmap object, buffer array
addRed

Arity - 1
Parameter - bitmap object
Expected output for valid use - change the targeted element named red in bitmap.pixelArray to 255,
expected output is alteration of bitmap image to red
Expected output for invalid use - no change in bitmap image color, change in bitmap image to a color other than red and value other than 255 on the red element
addBorder

Arity - 1
Parameter - bitmap object
Expected output for valid use - change the targeted row and column of pixels to 255 on the red value of the object to achieve a red border
Expected output for invalid use - no change in bitmap image color, change in bitmap image to a color other than red and value other than 255 on the red element
flipH

Arity - 1
Parameter - bitmap object
Expected output - flip bitmap image horizontally, resetting the row and columns to their inverse
flipV

Arity - 1
Parameter - bitmap object
Expected output - flip bitmap image vertically, resetting the row and columns to their inverse
FB {

Arity - 1
Parameter - bitmap object
Expected output - bitmap image will be mirrored along the horizontal axis
}

bitmap.js

Parameter - color table
Expected output - create color table for pixels

parseArgs.js

Parameter - agrv constructor(this)
Expected output - crrated true or false file path for altered images