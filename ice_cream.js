
function ice_cream( exam_text , preview_target )
{
    exam_text = String( exam_text );
    
    var subheading_reg = /^=\s+(\w+)/;
    var headline_reg = /^==\s+(\w+)/;
    var exam_tip_reg = /^#\s+/;
    var exam_q_reg = /^##\s+/;
    var exam_q_a_reg = /^###\s+/
    var exam_selector_reg = /^([A|B|C|D]\s+\w+)/
    var exam_t_f_reg = />\s+[T|t|F|f]\s*/

    var preview_html = '';

    var exam_tip_index = 1;
    var exam_q_index = 1;
    var exam_q_a_index = 1 ;
    
    exam_text.split('\n').forEach( ( value , index, array ) => {

        if(subheading_reg.test( value )){
            preview_html += 
                `<div style='text-align:center'><h3>`+
                value.match(subheading_reg)[1]+
                '</h3></div>';
        }
        else if(headline_reg.test( value ))
        {
            preview_html += 
                `<div style='text-align:center'><h3>`+
                value.match(headline_reg)[1]+
                '</h3></div>';

        }
        else if(exam_tip_reg.test( value ))
        {
            preview_html +=
                `<h4>`+ exam_tip_index+ '. '+
                value.split(exam_tip_reg)[1]+'</h4>';
            exam_tip_index++;    
        }
        else if( exam_q_reg.test(value) )
        {
            preview_html+= 
                `<h5 style='margin-left:15px'>`+exam_q_index+'. '
                + value.split( exam_q_reg )[1]+`</h5>` +
                (value.indexOf('__') > -1?
                `<input type='text' style='margin-left:20px'/>`:'');
            exam_q_index++;
        }
        else if( exam_selector_reg.test(value) )
        {
            preview_html +=
            `
            <label style='margin-left:20px'>
                <input type='checkbox'/>
                ${value}
            </label><br/>
            `;
        }
        else if( exam_q_a_reg.test( value ) )
        {
            preview_html+=
            `<h5 style='margin-left:20px'>
            (${exam_q_a_index}). ${value.split( exam_q_a_reg )[1]}</h5>`;
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
            <label style='margin-left:20px;'>
                <input type='checkbox'/>✅
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

