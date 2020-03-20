
    exam_text_0 = 
`= xxxxx学校
== 期末测试卷
= 计算机

# 判断题 
5
## xxxxxxxxx是对的
> T

## xxxxxxxaaaaaaxx是对的 
> F

## aasssssssxxxxxxxxx是对的 
> T
## xxxxxxx dd fdg dfslg fdgs dfkghsfhxx是对的 
> F

# 选择题
5

## 选( )还是AAAAAA
>A. KKKKKKKKKKKKK
B. LLLLLLLLLLLLLLL
C. MMMMMMMMMMMMMMMM
D. NNNNNNNNNNNNNNNNNNNNNN


## 这一题不选A的话选什么( )
#audio  './audio_0.mp3' '80%' 'audio_0'
A. PPPPPPP
>B. QQQQQQQQQQQQQQQQQQ
C. RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
D. SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS

6
## 这一题不选A的话选什么( )
#audio  './audio_0.mp3' '80%' 'audio_0'
A. PPPPPPP
B. QQQQQQQQQQQQQQQQQQ
C. RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
>D. SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS


# 填空题
8

## UUUUUUUUUUUUUUUUUUU____UUUUUUUUUUUUUUUUUUUu___UUU 
> _VBC _NBV

## VVVVVVV____VVVVVVVVVVVVVVVVVV__VVVVVVVVVVV
> _LLLNNN _MMMM

## WWWWWWWWWWWWWWWWWWWWWW______WWWWWWWWWWWWWW
> _LLSS

# XXXXXXXXXXXXXXXXXXXXXXXX

## YYYYYYYYYYYYYYYYYY     YYYYYYYYYYYYYYYYY
#image              './image_0.png' '80%' 'image_0'


### KLKLKLKLKLKLKLKLKLKLKLKLKLKLKLKLKLKLKL ?
?
10
< 
HSDKJF HAFKh akf fha lfhadsfkj abva mnf lf alk
a fhjaksfha skgg das
as jakfsad gg asldfag sbaf fasd
a fadhfa sgf adsjk asdkfk basjvba
>

### BVBVBBVBVBVBVBV    BBVBVBVBVBVBVBVBVBVBVBV ?
?
#video     './video_0.mp4' '80%' 'video_0'

30
< 
dhg skdghs kghsdg hslgahga g
ahag bxvbfhag 
a jalhf ag
>

## ZZZZZZZZZZZZZZZZZZZZ    ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ ?
?
< 
hdfkkgh sdgkl hsdffgklflsh fgf kghagn dvuwh erugbdv x v ,ah ,kah,d agha 
 gahlghakghagbcx,vaa
 ah algha ga
>`;

function test_revise()
{

}

// get answers from origin
function test_2()
{
    var answer_index = 0;
    var selector_reg = /\n+[A-E]\./g
    // String( exam_text_0 ).split(/\n+\d+\n+/).slice(1).forEach( 
    //     (g_value, g_index, g_array)=>{
            String( exam_text_0 ).split(/>/).slice(1).forEach( 
                (a_value , a_index, a_array )=>{
        
                    var first_line = a_value.split('\n')[0].trim();
                    first_line = /^[A-Z]\./.test( first_line )? 
                        first_line.split('.')[0]: first_line;
        
                    if( /\S+/.test( first_line ) )
                    {
                        var answer = first_line.trim();

                        if( /[A-E]/.test( answer ) || /[T|t]/.test( answer ) )
                        {
                            console.log('>>>>' + answer_index );
                        } 
                        
                        if( /^_/.test( answer ) )
                        {

                            console.log('>>>>' + answer_index );
                            console.log(  answer );
                        }

                        answer_index += ( a_value.match( selector_reg ) || [] )
                            .length +  1;
                        
                        
                    }
            });
        
            String( exam_text_0 ).split('<').slice(1).forEach( 
                (a_value , a_index, a_array )=>{
                    var answer = a_value.split('>')[0].trim();
                    
                    console.log('>>>>' + answer_index );

                    console.log(  answer );

                    answer_index++;
        
            });
        // }
    // )

}

(function(){
    var exam_text = exam_text_0;
    
    exam_text = exam_text.replace('\\\n', '');

    var subheading_reg = /^=\s+/;
    var headline_reg = /^==\s+/;
    var exam_tip_reg = /^#\s+/;
    var exam_q_reg = /^##\s+/;
    var exam_q_a_reg = /^###\s+/
    var exam_selector_reg = /^(>*[A-E].\s+\w+)/
    var exam_t_f_reg = />\s+[T|t|F|f]\s*/


    var preview_html = '';

    var exam_tip_index = 1;
    var exam_q_index = 1;
    var exam_q_a_index = 1 ;

        exam_text.split('\n').forEach( ( value , index, array ) => {

        if(subheading_reg.test( value )){
            preview_html += 
                `<div style='text-align:center'><h3>`+
                value.split(subheading_reg)[1]+
                '</h3></div>';
        }
        else if(headline_reg.test( value ))
        {
            preview_html += 
                `<div style='text-align:center'>
                    <h3>`+
                        value.split(headline_reg)[1]+
                    `</h3>
                </div>`;

        }
        else if(exam_tip_reg.test( value ))
        {
            preview_html +=
                `<h4>`+ 
                    exam_tip_index+ '. '+
                    value.split(exam_tip_reg)[1] +
                `</h4>`;
            exam_tip_index++;    
        }
        else if( exam_q_reg.test(value) )
        {
            preview_html+= 
                `<h5 style='margin-left:15px'>`+
                    exam_q_index+'. '+
                    value.split( exam_q_reg )[1]+
                `</h5>` +
                (value.indexOf('__') > -1?
                    `<input type='text' style='margin-left:20px'/>`:
                    '');

            exam_q_index++;
        }
        else if( exam_selector_reg.test(value) )
        {
            preview_html +=
            `
            <label style='margin-left:20px'>
                <input type='checkbox'/>
                ${ /^>/.test( value ) ? String( value ).substring(1): value  }
            </label><br/>
            `;
        }
        else if( exam_q_a_reg.test( value ) )
        {
            preview_html+=
            `<h5 style='margin-left:20px'>
                (${exam_q_a_index}). ${value.split( exam_q_a_reg )[1]}
            </h5>`;

            exam_q_a_index++;
        }
        else if ( value =='?' )
        {
            preview_html +=
            `
                <textarea style='width:80%; margin-left:20px'
                rows='10'></textarea>
            `;
        }
        else if( exam_t_f_reg.test( value )  )
        {
            preview_html+=
            `
            <label style='margin-left:20px;font-size:150%;'>
                <input type='checkbox' /> ✔
            </label>
            `;
        }
        else if( /^#audio\s+/.test(value) )
        {
            var value_splits = value.split("'");
            preview_html+=
            `
            <div style='margin-left:20px; width:100%'>
                <audio src="${value_splits[1]}" controls="controls"
                    style='width:${value_splits[3]?'50%':value_splits[3]}'
                    alt='${value_splits[5] ? value_splits[5]:"audio" }'>
                </audio>
            </div>
            `;
        }
        else if( /^#video\s+/.test(value) )
        {
            var value_splits = value.split("'");
            preview_html+=
            `
            <div style='margin-left:20px; width:100%'>
                <video src="${value_splits[1]}" controls="controls"
                    style='width:${value_splits[3]?'50%':value_splits[3]}'
                    alt='${value_splits[5] ? value_splits[5]:"video" }'>
                </video>
            </div>
            `;
        }
        else if( /^#image\s+/.test(value) )
        {
            var value_splits = value.split("'");
            preview_html+=
            `
            <div style='margin-left:20px; width:100%'>
                <img src="${value_splits[1]}"
                    style='width:${value_splits[3]?'50%':value_splits[3]}'
                    alt='${value_splits[5] ? value_splits[5]:'image'}'/>
            </div>
            `;
        }
        
    });
    
    document.querySelector('#exam_preview').insertAdjacentHTML( 
        'beforeend', preview_html
    );


}());

// get answers from respondence
function test_0()
{
    var labels = document.querySelectorAll('label');
    var answer_index = 0;
    labels.forEach( ( l_value, l_key, l_parent )=>{
        if( l_value.querySelector('input').checked )
        {
            console.log( answer_index );
        }

        answer_index++;
        
    } );

    var input_texts = document.querySelectorAll(`input[type='text'],textarea`);
    input_texts.forEach( (l_value, l_key, l_parent)=>{
        console.log( answer_index );
        console.log( l_value.value );
        answer_index++;
    } );
}
// get answers from origin
function test_1()
{
    String(exam_text_0).split('>|(?:[A-E].)').slice(1).forEach( 
        (a_value , a_index, a_array )=>{
            if( /\S+/.test( first_line ) )
                var first_line = a_value.split('\n')[0];
                first_line = /\s*[A-E]./.test( first_line )? 
                    first_line.split('.')[0]: first_line;
                var answer = first_line.trim();
                
                console.log( answer );
    });

    String(exam_text_0).split('<').slice(1).forEach( 
        (a_value , a_index, a_array )=>{
            var answer = a_value.split('>')[0];
            console.log( answer );
    });

}