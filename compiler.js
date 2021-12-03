

/** dom string转obj 存储 */
function tokenizer(templateDomStr) {
    let tokens = [], type = '', val = '';

    // 生成obj  存入 tokens
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
        val += ch;
    }
    return tokens;
}

/** 返回ast */
function parse(templateDomStr) {
    const tokens = tokenizer(templateDomStr)
    let cur = 0, ast = {
        type: 'root',
        props: [],
        children: []
    }
    // 递归 组建 ast抽象语法树
    function walk() {
        let token = tokens[cur]
        if (token.type == 'tagstart') {
            let node = {
                type: 'elemnet',
                tag: token.val,
                props: [],
                children: []
            }
            token = token[++cur]
            while (token.type !== 'tagend') {
                if (token.type == 'props') {
                    node.props.push(walk())
                } else {
                    node.children.push(walk())
                }
                token = token[cur]
            }
            cur++
            return node
        }
        if (token.type == 'text') {
            cur++
            return token
        }
        if (token.type == 'props') {
            cur++
            const [key, val] = token.val.split('=')
            return {
                key,
                val
            }
        }
    }

    while (cur < tokens.length) {
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
    console.log('ast==',ast);
    transform(ast)
}

let tmpl = `<div id="app">
      <p @click="add" :id="name">{{name}}</p>
      <h1 class="item">技术摸鱼</h1>
  </div>`

compiler(tmpl)