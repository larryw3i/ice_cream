
/*!
  * ice_cream.js (https://github.com/larryw3i/ice_cream)
  * Copyright 2020 Larry Wei (https://github.com/larryw3i)
  * Licensed under LGPL v3.0 \
  * (https://github.com/larryw3i/ice_cream/blob/master/LICENSE)
  */

function get_respondence_anwsers()
{
    var labels = document.querySelectorAll('label');
    var answer_index = 0;

    var respondence_anwsers = [];

    labels.forEach( ( l_value, l_key, l_parent )=>{
        if( l_value.querySelector('input').checked )
        {
            respondence_anwsers.push( answer_index );
        }

        answer_index++;
        
    } );

    var input_texts = document.querySelectorAll(`input[type='text'],textarea`);
    input_texts.forEach( (l_value, l_key, l_parent)=>{

        respondence_anwsers.push( `_${answer_index} ${l_value.value}` );

        answer_index++;
    } );

    return respondence_anwsers;
}

function get_origin_anwsers( exam_text )
{
    var answer_index = 0;
    
    // Don't rock the boat
    var selector_reg = /\n+[A-E]\./g;
    var answers = [];

    exam_text.split(/>/).slice(1).forEach( 
        (a_value , a_index, a_array )=>{

            var first_line = a_value.split('\n')[0].trim();
            first_line = /^[A-E]\./.test( first_line )? 
                first_line.split('.')[0]: first_line;

            if( /\S+/.test( first_line ) )
            {
                var answer = first_line.trim();

                if( /[A-E]/.test( answer ) || /[T|t]/.test( answer ) )
                {
                    answers.push( answer_index );
                }

                if( /\s+_/.test( answer ) )
                {
                    answers.push( `${answer_index} ${answer}` );
                }
                
                answer_index += ( a_value.match( selector_reg ) || [] )
                    .length +  1;
                
            }
    });

    exam_text.split('<').slice(1).forEach( 
        (a_value , a_index, a_array )=>{
            var answer = a_value.split('>')[0].trim();
            
            answers.push( `_${answer_index} ${answer}` );

            answer_index++;

    });

    return answers;

}


function preview( exam_text , preview_target )
{
    exam_text = exam_text .replace('\\\n', '');

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
                `<div style='text-align:center'>
                    <h3>`+
                        value.split(subheading_reg)[1]+
                    `</h3>
                </div>`;
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
                ${ /^>/.test( value ) ? value.substring(1): value  }
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
    
    document.querySelector( preview_target ).insertAdjacentHTML( 
        'beforeend', preview_html
    );
}

