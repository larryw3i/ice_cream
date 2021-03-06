/*!
  * ice_cream.js (https://github.com/larryw3i/ice_cream)
  * Copyright 2020 Larry Wei (https://github.com/larryw3i)
  * Licensed under LGPL v3.0 \
  * (https://github.com/larryw3i/ice_cream/blob/master/LICENSE)
  */


/** 
 * Preview the examination.
 * @param {String} exam_text  the examination text.
 * @param {String} target the target element to show preview, it is the \
 * selector string.
 */
function preview(exam_text, target) {
    var preview_html = '';

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

    var textarea_template = (question_num) => `
         <textarea data-question_num='${question_num}' 
             rows='5' style='width:80%'></textarea>
     `;

    var input_template = (question_num) => `
         <input type='text' data-question_num='${question_num}' />
     `;

    var option_template = (question_num, value) => `
         <label>
             <input type="checkbox" name='option_${question_num}' 
                 data-question_num='${question_num}' 
                 value='${ value.split(/\s+/)[0]}'/>${value}
         </label>
         <br/>
     `;

    var tf_template = (question_num) => `
         <label>
             <input type="radio" name='tf_${question_num}' 
                 data-question_num='${question_num}' value='T'/>✅
         </label>
         <label>
             <input type="radio" name='tf_${question_num}' 
                 data-question_num='${question_num}' value='F'/>❌
         </label>
     `;

    exam_text.replace(/\\\n/g, '').trim().split('\n')
        .forEach((value, index, array) => {
            if (heading_reg.test(value)) {
                var heading_size = 7 - (value.match(/=/g)).length;
                var heading = value.substring(value.lastIndexOf('= ') + 2);
                preview_html += `
                <div style='width:100%;text-align:center'>
                    <h${ heading_size}>${heading}</h${heading_size}>
                </div>
             `;

            }
            else if (neg_heading_reg.test(value)) {
                var heading_size = (value.match(/#/g)).length;
                var heading = value.substring(value.lastIndexOf('# ') + 2);
                preview_html += `
                <h${ heading_size}>${heading}</h${heading_size}>
             `;
            }
            else if (question_reg.test(value)) {
                question_num++;
                var question = value.split(/\?\s+/g)[1];
                preview_html += `
                 <h5>${ question_num}. ${question}</h5>
             `;
            }
            else if (media_reg.test(value) || media_simple_reg.test(value)) {
                var media_params = value.match(media_params_reg);
                var media_width = media_params[1] ?
                    media_params[1].replace(/'|"/g, '') : '80%';
                var media_alt = media_params[2]? 
                    media_params[2].replace(/'|"/g, ''):'';

                var properties = `
                 style='width:${ media_width }' 
                 src='${ media_params[0].replace(/'|"/g, '')}' 
                 alt='${ media_alt }'
             `

                if (value.startsWith('#i')) {
                    preview_html += `<img ${properties} />`;
                }
                else if (value.startsWith('#v')) {
                    preview_html += `<video ${properties} controls></video>`;
                }
                else if (value.startsWith('#a')) {
                    preview_html += `<audio ${properties} controls ></audio>`;
                }
            }
            else if (tf_reg.test(value)) {
                preview_html += tf_template(question_num);
            }
            else if (option_rg.test(value)) {
                preview_html += option_template(
                    question_num,
                    value)
            }
            // keep textarea_rg front
            else if (textarea_rg.test(value)) {
                preview_html += textarea_template(question_num);
            }
            else if (input_rg.test(value)) {
                preview_html += input_template(question_num)
                    .repeat(value.match(/_/g).length);
            }
        })

    document.querySelector(target).innerHTML = preview_html;
}

/**
 * Get an array of anwsers from respondence, the array is like: \
 * [{1:'T'},{2:'F'}]
 * @returns { Array } 
 */
function get_answers() {
    var anwser = [];
    var current_q_num = 1;
    var multi_anwser = '';

    document.querySelectorAll(
        '[type="checkbox"]:checked,[type="radio"]:checked')
        .forEach((value, key, parent) => {
            // new question
            if (value.dataset.question_num != current_q_num) {
                anwser.push({ [current_q_num]: multi_anwser })
                current_q_num = value.dataset.question_num;
                multi_anwser = value.value;
            }
            else {
                multi_anwser += value.value;
            }
        }
        )


    document.querySelectorAll(
        '[type="text"],textarea').forEach(
            (value, key, parent) => {
                // new question            
                if (value.dataset.question_num != current_q_num) {
                    current_q_num = value.dataset.question_num;
                    anwser.push({ [current_q_num]: multi_anwser });
                    multi_anwser = value.value.trim();
                }
                else {
                    multi_anwser += (',' + value.value.trim());
                }

                if (key == parent.length - 1) {
                    anwser.push({ [current_q_num]: multi_anwser });
                }
            }
        )
    return anwser;

}
