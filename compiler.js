

/** dom string转obj 存储 */
function tokenizer(templateDomStr) {
    let tokens = [], type = '', val = '';

    function push() {
        if (val) {
            if (type === 'tagstart') val = val.slice(1) // <div> => div
            if (type === 'tagend') val = val.slice(2) // </div> => div
        }
        tokens.push({
            type,
            val
        })
        val = ''
    }

    for (let i = 0; i < templateDomStr.length; i++) {
        const ch = templateDomStr[i];
        if (ch === '<') {
            push()
            if (templateDomStr[i + 1] === '/') {
                type = 'tagend'
            } else {
                type = 'tagstart'
            }
        }
        if (ch === '>') {
            push()
            type = 'text';
            continue
        } else if (/[\s]/.test(ch)) {
            push();
            type = 'props'
            continue
        }
        val +=ch;
    }
    return tokens;
}

/** 返回ast */
function parse(templateDomStr) {
    const token = tokenizer(templateDomStr)
    let cur= 0,ast= {
        type:'root',
        props:[],
        children:[]
    }
    function walk(){
        
    }

    while(cur < tokens.length){
        ast.children.push(walk())
    }
    console.log(token);
    return ast
}

/** 优化ast */
function transform() {

}

// 编译
function compiler(templateDomStr) {
    const ast = parse(templateDomStr);
    transform(ast)
}

let tmpl = `<div id="app">
      <p @click="add" :id="name">{{name}}</p>
      <h1 class="item">技术摸鱼</h1>
  </div>`

compiler(tmpl)