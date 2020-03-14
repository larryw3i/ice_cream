
(function(){
    examination_text = 
`AAAAAAAAAAAAAA
BBBBBBBBBBB
CCCcccCCCCC
==
# DDDDDDDDDDDDDDDDDDDDDDDD 
<5>
## EEEEEEEEEEEEEEEEEEEEEEEEE TF
> T
## FFFFFFFFFFFFFFFFFFFFFFFF TF
> F
## GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG TF
> T
## HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH TF
> F

# IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
<5>

## JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ( )JJJJJJJJJJJJJJJJJJJJ
#media  'url' 'width' 'alt'
### KKKKKKKKKKKKK
### LLLLLLLLLLLLLLL
### MMMMMMMMMMMMMMMM
### NNNNNNNNNNNNNNNNNNNNNN
> A

## OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO( )OOOOOOO
#audio  'url' 'width' 'alt'
### PPPPPPP
### QQQQQQQQQQQQQQQQQQ
### RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
### SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
> B

# TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
<6>

## UUUUUUUUUUUUUUUUUUU____UUUUUUUUUUUUUUUUUUUu___UUU 
> VBC NBV

## VVVVVVV____VVVVVVVVVVVVVVVVVV__VVVVVVVVVVV
> LLLNNN MMMM

## WWWWWWWWWWWWWWWWWWWWWW______WWWWWWWWWWWWWW
> LLSS

# XXXXXXXXXXXXXXXXXXXXXXXX

## YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
#image  'url' 'width' 'alt'

### KLKLKLKLKLKLKLKLKLKLKLKLKLKLKLKLKLKLKL ?
<10>

> HSDKJF HAFKh akf fha lfhadsfkj abva mnf lf alk
a fhjaksfha skgg das
as jakfsad gg asldfag sbaf fasd
a fadhfa sgf adsjk asdkfk basjvba

### BVBVBBVBVBVBVBVBBVBVBVBVBVBVBVBVBVBVBV ?
<10>
#video  'url' 'width' 'alt'

> dhg skdghs kghsdg hslgahga g
ahag bxvbfhag 
a jalhf ag

## ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ ? 
<10>
> hdfkkgh sdgkl hsdffgklflsh fgf kghagn dvuwh erugbdv x v ,ah ,kah,d agha 
 gahlghakghagbcx,vaa
 ah algha ga

`;

var exam_split_lines = String( examination_text ).split('\n');
var subheading = exam_split_lines[0];
var headline = exam_split_lines[1];
var subheading_0 = exam_split_lines[2];

var exam_type_split_reg = /\s+#\s+/

var exam_types = String( examination_text ).split('==')[1]
    .split( exam_type_split_reg );
exam_types = exam_types.slice( 1, exam_types.length );

exam_types.forEach( (t_value, t_index, t_array)=>{
    console.log( 't_value '+ t_index );
    console.log( t_value );
});



}());