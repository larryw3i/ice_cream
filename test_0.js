
/*!
  * ice_cream.js (https://github.com/larryw3i/ice_cream)
  * Copyright 2020 Larry Wei (https://github.com/larryw3i)
  * Licensed under LGPL v3.0 \
  * (https://github.com/larryw3i/ice_cream/blob/master/LICENSE)
  */

var exam_text = `
=== xxxx中学
== 物理
=== 期中测试卷

# 判断题

// 1
? 你觉得AAAA 
TF

// 2
? AAA 是 BBBBB
TF


# 选择题

// 3
? 如果, 以下选择( )什么呢?
A 选择什么呢? 想到答案了吗?
B 选择A
C 选择什么我不告诉你
D 选择A
#image              './image_0.png' '50%' 'image_0'

// 4
? 在A面有CCC, A经过HHH, 则
A AAA, 啊啊啊啊
B BBBB， bbbbb。
C mmmmm，mmmmm
D lll, mmm, sdfhkfas, yayayaya, 哈哈哈哈。>

# 填空题

// 5
? AAAAA，BBBBB, CCCC, __, ___DDD，EEEE，FFF。
_ _


// 6
? SSSSDDD，DDDCCC，hhhh，__, __, ___, KKKKK， SSS。
_ _ _

# 简答题

## 阿啊啊啊啊啊啊啊啊，的的点点滴滴的的的，的的点点滴滴的点点滴滴的。请求请求权请\
求权请求权请求权全球，qqqqqqqq。
// 7
? sahfkasf，ddddddd，的的点点滴滴的的的
#audio  './audio_0.mp3' '50%' 'audio_0'

__
## 阿啊啊啊啊啊啊啊啊，的的点点滴滴的的的，的的点点滴滴的点点滴滴的。请求请求权请\
求权请求权请求权全球，qqqqqqqq。kkkkkkk， 口口口口口口口。

// 8
? sahfkasf，ddddddd，的的点点滴滴的的的，口口口口口可。
__

// 9
? sahfkasf，ddddddd，的的点点滴滴的的的，口口口口口可。sdsdsdsdsdsdsd，岁的赛赛\
道赛道赛道
#video './video_0.mp4' '50%' 'video_0'
__

----

1 2 2
3 4 5
5 8 10
9 20


1T 2F \
3A 4BC \

5[AAA啊啊啊] [jjjj] 6[AAAAA] [的点点滴滴的] [哦噢哦哦哦] \

7[阿啊啊啊啊,\
啊啊啊啊,啊啊啊啊，的饭店饭店饭店饭店饭店饭店副，的饭店饭店饭店饭店饭店副，\
卡拉卡拉卡拉卡拉卡拉卡拉卡拉，哦皤皤皤皤皤皤。] \

8[岁的赛道赛道赛道赛道赛道赛道，岁的赛道赛道赛道赛道赛道赛道，岁的赛道赛道赛道，\
即可将客家客家客家客家可，广会馆会馆会馆会馆会馆会馆会馆会馆和。] \

9[ksksks，ksksksksksk. ksksksksksksks库萨克萨克萨克萨克司。库萨克萨克萨克司，\
啦啦啦啦啦啦。]

`;

function preview( target )
{
    var preview_html  =  '';

    var heading_reg = /^\=+\s+/;

    var neg_heading_reg = /^#+\s+/;

    var question_reg = /^\?\s+/;

    var media_reg = /^#(image|video|audio)/;

    var media_simple_reg = /^#(i|v|a)/;
    
    var media_params_reg = /(?:\'|\")(\S+)(?:\'|\")/g;

    var tf_reg = /^TF\s*$/;

    var option_rg = /^[A-Z]\s+/

    var input_rg = /^_\s*/;

    var textarea_rg = /^__\s*/;

    var question_num = 0;

    var textarea_template = ( question_num ) => `
        <textarea data-question_num='${question_num}' 
            rows='5' style='width:80%'></textarea>
    `;

    var input_template = ( question_num ) => `
        <input type='text' data-question_num='${question_num}' />
    `;

    var option_template = (question_num, value)=> `
        <label>
            <input type="checkbox" name='option_${question_num}' 
                data-question_num='${question_num}' 
                value='${ value.split(/\s+/)[0] }'/>${value}
        </label>
        <br/>
    `;

    var tf_template =( question_num )=> `
        <label>
            <input type="radio" name='tf_${question_num}' 
                data-question_num='${question_num}' value='T'/>✅
        </label>
        <label>
            <input type="radio" name='tf_${question_num}' 
                data-question_num='${question_num}' value='F'/>❌
        </label>
    `;

    exam_text.replace(/\\\n/g,'').trim().split('\n')
    .forEach( (value, index, array)=>{
        if( heading_reg.test( value ) )
        {
            var heading_size = 7 - ( value.match(/=/g) ).length;
            var heading = value.split(/\s+/g)[1];
            preview_html += `
                <h${ heading_size }>${ heading }</h${ heading_size }>
            `;

        }
        else if( neg_heading_reg.test( value ) )
        {
            var heading_size =  ( value.match(/#/g) ).length;
            var heading = value.split(/\s+/g)[1];
            preview_html += `
                <h${ heading_size }>${ heading }</h${ heading_size }>
            `;
        }
        else if( question_reg.test( value ) )
        {
            question_num++;
            var question = value.split(/\?\s+/g)[1];
            preview_html +=`
                <h5>${ question_num }. ${question}</h5>
            `;
        }
        else if( media_reg.test( value ) || media_simple_reg.test( value ) )
        {
            var media_params = value.match( media_params_reg );
            var properties = `
                style='width:${ media_params[1].replace(/'|"/g, '') }' 
                src='${ media_params[0].replace(/'|"/g, '') }' 
                alt='${ media_params[2].replace(/'|"/g, '') }'
            `

            if( value.startsWith('#i') )
            {
                preview_html += `<img ${properties} />`;
            }
            else if( value.startsWith('#v') )
            {
                preview_html +=`<video ${properties} controls></video>`;
            }
            else if( value.startsWith('#a') )
            {
                preview_html +=`<audio ${properties} controls ></audio>`;
            }
        }
        else if( tf_reg.test( value ) )
        {
            preview_html += tf_template( question_num );
        }
        else if( option_rg.test( value ) )
        {
            preview_html += option_template( 
                question_num, 
                value )
        }
        // keep textarea_rg front
        else if( textarea_rg.test( value ) )
        {
            preview_html += textarea_template( question_num );
        }
        else if( input_rg.test( value ) )
        {
            preview_html += input_template( question_num )
                .repeat( value.match(/_/g).length );
        }
    } )

    document.querySelector( target ).innerHTML = preview_html;
}

function get_answers()
{
    var anwser = [];
    var current_q_num = 0;
    var multi_anwser = '';

    document.querySelectorAll(
    '[type="checkbox"]:checked,[type="radio"]:checked')
        .forEach( (value, key , parent)=>{
            // new question
            if( value.dataset.question_num != current_q_num )
            {
                current_q_num = value.dataset.question_num;
                multi_anwser = value.value;
                anwser.push( { [current_q_num]: multi_anwser } )
            }
            else
            {
                multi_anwser += value.value;
            }
        }
    )
    

    document.querySelectorAll(
        '[type="text"],textarea').forEach(
        (value, key , parent)=>{
            // new question            
            if( value.dataset.question_num != current_q_num )
            {
                current_q_num = value.dataset.question_num;
                multi_anwser =  value.value.trim();
                anwser.push( { [current_q_num]:  multi_anwser } )
            }
            else
            {
                multi_anwser += (','+value.value.trim() );
            }
        }
    )
    return anwser;

}


(function(){

    preview('#exam_preview');

}());