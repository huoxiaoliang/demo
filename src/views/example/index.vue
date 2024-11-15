<template>
  <div class="sandcastle-box">
    <div class="sandcastle-content">
      <!-- 编辑器 -->
      <div v-show="codeVisible" ref="sandcastlCodebox" class="sandcastl-codebox">
        <div class="sandcastl-codebox-title">
          <h4>代码编辑器</h4>
          <div class="btn">
            <el-button type="warning" size="mini" icon="el-icon-refresh" @click="reset"></el-button>
            <el-button type="success" size="mini" icon="el-icon-video-play" @click="run"></el-button>
          </div>
        </div>
        <div class="sandcastl-codebox-header">
          <div class="sandcastl-code-type">
            <span :class="{ typeActive: jsEditorShow }" @click="tabClickHandler('js-editor')">JavaScript</span>
            <span :class="{ typeActive: htmlEditorShow }" @click="tabClickHandler('html-editor')">HTML</span>
            <span :class="{ typeActive: cssEditorShow }" @click="tabClickHandler('css-editor')">CSS</span>
          </div>
        </div>
        <div class="sandcastl-codebox-content">
          <div v-show="jsEditorShow" ref="js-editor" class="js-editor"></div>
          <div v-show="htmlEditorShow" ref="html-editor" class="html-editor"></div>
          <div v-show="cssEditorShow" ref="css-editor" class="css-editor"></div>
        </div>
      </div>
      <div v-show="codeVisible" class="sandcastl-drag" draggable="true" @drag="sandcastlDrag">
        <div></div>
      </div>
      <!-- 视图 -->
      <div class="sandcastl-global">
        <div class="top-content">
          <el-button size="mini" :class="codeVisible ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="codeVisible = !codeVisible" v-html="codeVisible ? '收起源代码' : '打开源代码'"></el-button>
        </div>
        <div ref="example" class="example"></div>
        <div class="fullScreen" @click="fullMap">
          <el-button title="全屏" round size="mini" type="primary" icon="el-icon-full-screen"></el-button>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="sandcastle-footer">
      <div class="sandcastle-footer-type">
        <span v-for="item in examplesType" :key="item.name" :class="{ typeActive: item === activeItem }" @click="footerType(item)">{{ item.label }}</span>
      </div>
      <ul ref="footer" class="sandcastle-footerUl">
        <li v-for="item in examplesData" v-show="item.show" :key="item.name" :class="{ nameActive: item.name === example }" @click="changeExample(item)">
          <p>
            <span>{{ item.label }}</span>
          </p>
          <div>
            <img :src="'examples/images/' + item.type.toLowerCase() + '/' + item.name.toLowerCase() + '.' + item.pictureType" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import * as axios from 'axios'
import * as monaco from 'monaco-editor'

export default {
  name: 'example',
  data() {
    return {
      examplesType: [{ name: 'All', label: '全部' }],
      examplesData: [],
      activeName: '',
      activeItem: '',
      type: '',
      example: '',
      tempHtml: '',
      oriHtmlStr: '',
      htmlStr: '',
      oriJsStr: '',
      jsStr: '',
      oriCssStr: '',
      cssStr: '',
      htmlEditor: null,
      jsEditor: null,
      cssEditor: null,
      codeVisible: true,
      jsEditorShow: false,
      cssEditorShow: false,
      htmlEditorShow: false
    }
  },

  watch: {
    codeVisible(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.createEditor()
        })
      }
    },
    activeName(newValue) {
      switch (newValue) {
        case 'js-editor':
          this.jsEditorShow = true
          this.cssEditorShow = false
          this.htmlEditorShow = false
          break
        case 'html-editor':
          this.jsEditorShow = false
          this.cssEditorShow = false
          this.htmlEditorShow = true
          break
        case 'css-editor':
          this.jsEditorShow = false
          this.cssEditorShow = true
          this.htmlEditorShow = false
          break
      }
    }
  },
  async mounted() {
    await this.getExamplesData()
    const that = this
    this.$refs.footer.addEventListener(
      'mousewheel',
      function (e) {
        if (e.wheelDelta) {
          that.$refs.footer.scrollLeft -= (e.wheelDelta * 70) / 120
        }
      },
      false
    )
    const name = this.$route.query.name
    const type = this.$route.query.type
    if (name) {
      this.changeExample({ name, type })
    }
    console.log(this.$route)
  },
  methods: {
    createEditor() {
      const config = {
        theme: 'vs-dark',
        formatOnPaste: true,
        fontSize: 14,
        scrollbar: {
          verticalScrollbarSize: 2
        },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        autoIndent: false
      }
      if (!this.jsEditor) {
        this.jsEditor = monaco.editor.create(this.$refs['js-editor'], {
          language: 'javascript',
          ...config
        })
        this.jsEditor.setValue(this.jsStr)
      } else {
        this.jsEditor.setValue(this.jsStr)
      }
      if (!this.htmlEditor) {
        this.htmlEditor = monaco.editor.create(this.$refs['html-editor'], {
          language: 'html',
          ...config
        })
        this.htmlEditor.setValue(this.htmlStr)
      } else {
        this.htmlEditor.setValue(this.htmlStr)
      }
      if (!this.cssEditor) {
        this.cssEditor = monaco.editor.create(this.$refs['css-editor'], {
          language: 'css',
          ...config
        })
        this.cssEditor.setValue(this.cssStr)
      } else {
        this.cssEditor.setValue(this.cssStr)
      }
    },
    reset() {
      this.jsStr = this.oriJsStr
      this.htmlStr = this.oriHtmlStr
      this.cssStr = this.oriCssStr
      this.jsEditor && this.jsEditor.setValue(this.jsStr)
      this.htmlEditor && this.htmlEditor.setValue(this.htmlStr)
      this.cssEditor && this.cssEditor.setValue(this.cssStr)
      this.loadExample()
    },
    run() {
      this.jsStr = this.jsEditor ? this.jsEditor.getValue() : this.oriJsStr
      this.htmlStr = this.htmlEditor ? this.htmlEditor.getValue() : this.oriHtmlStr
      this.cssStr = this.cssEditor ? this.cssEditor.getValue() : this.oriCssStr
      this.loadExample()
    },
    getTempPage() {
      return axios.get('examples/pages/temp.html')
    },
    getExamplePage() {
      return axios.get(`examples/pages/${this.type}/${this.example}.html`)
    },
    loadExample() {
      this.createEditor()
      const iFrame = this.createIFrame()
      const iframeDocument = iFrame.contentWindow.document
      iframeDocument.open()
      const content = this.htmlStr + '<script>' + this.jsStr + '<' + '/script>'
      const cssContent = '<style>' + this.cssStr + '<' + '/style>'
      iframeDocument.write(this.tempHtml.replace('<cssTemp />', cssContent))
      iframeDocument.write(this.tempHtml.replace('<htmlTemp />', content))

      iframeDocument.close()
    },
    createIFrame() {
      const examplePage = this.$refs['example']
      examplePage.innerHTML = ''
      const iframe = document.createElement('iframe')
      iframe.setAttribute('id', 'innerPage')
      iframe.setAttribute('name', 'innerPage')
      examplePage.append(iframe)
      return iframe
    },
    tabClickHandler(tab) {
      this.activeName = tab
    },
    getExamplesData() {
      axios.get('examples/index.json').then((res) => {
        const data = res.data.dev || []
        data.forEach((d) => {
          this.examplesType.push(d)
          d.children &&
            d.children.forEach((c) => {
              this.examplesData.push({
                type: d.name,
                name: c.name,
                label: c.label,
                show: true,
                pictureType: c.pictureType || 'png'
              })
            })
        })
      })
    },
    footerType(item) {
      this.activeItem = item
      if (item.name === 'All') {
        this.examplesData.forEach((e) => {
          e.show = true
        })
      } else {
        this.examplesData.forEach((e) => {
          e.type === item.name ? (e.show = true) : (e.show = false)
        })
      }
    },
    changeExample(item) {
      this.$route.query[name] = item.name
      this.activeName = 'js-editor'
      this.type = item.type
      this.example = item.name
      axios.all([this.getTempPage(), this.getExamplePage()]).then(
        axios.spread((tempPage, examplePage) => {
          this.tempHtml = tempPage.data
          const exampleHtml = examplePage.data
          if (exampleHtml && this.tempHtml) {
            const index = exampleHtml.indexOf('<script>')

            this.oriHtmlStr = exampleHtml.substring(0, index)
            const endIndex = exampleHtml.indexOf('<' + '/' + 'script>')
            this.oriJsStr = exampleHtml
              .substring(index, endIndex)
              .replace(/<\/?script>\n?/g, '')
              .replace(/(\n[\s\t]*\r*\n)/g, '\n')
              .replace(/^[\n\r\n\t]*|[\n\r\n\t]*$/g, '')
            this.oriCssStr = exampleHtml
              .substring(endIndex)
              .replace(/<\/?style>\n?/g, '')
              .replace(/<\/?script>\n?/g, '')
              .replace(/(\n[\s\t]*\r*\n)/g, '\n')
              .replace(/^[\n\r\n\t]*|[\n\r\n\t]*$/g, '')
            this.jsStr = this.oriJsStr
            this.htmlStr = this.oriHtmlStr
            this.cssStr = this.oriCssStr
            this.loadExample()
          }
        })
      )
    },
    sandcastlDrag(e) {
      if (e.screenX > 400) {
        this.$refs.sandcastlCodebox.style.flex = 'none'
        this.$refs.sandcastlCodebox.style.height = '100%'
        this.$refs.sandcastlCodebox.style.width = e.screenX + 'px'
        this.jsEditor && this.jsEditor.layout()
        this.cssEditor && this.cssEditor.layout()
        this.htmlEditor && this.htmlEditor.layout()
      }
    },
    fullMap() {
      this.fullScreen(this.$refs.example)
    },
    //全屏
    fullScreen(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      }
    }
  }
}
</script>

<style lang="scss">
#innerPage {
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
}
</style>
<style lang="scss">
.sandcastle-box {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .sandcastle-content {
    display: flex;
    flex-direction: row;
    flex: 1;

    .sandcastl-drag {
      width: 6px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #efefef;
      cursor: w-resize;
      div {
        background-color: #3781f6;
        height: 19px;
        width: 2px;
      }

      &:hover {
        background-color: #948f90;
      }
    }
    div.sandcastl-global {
      display: flex;
      flex: 1;
      position: relative;
      .example {
        width: 100%;
      }
      .fullScreen {
        position: absolute;
        bottom: 44px;
        left: 20px;
      }
      .top-content {
        width: 100%;
        height: 30px;
        position: absolute;
        /* z-index: 2; */
        background-color: #000000b3;
        .el-button {
          margin: 2px;
          background-color: unset;
          color: rgb(238, 238, 238);
          border: none;
        }
      }
    }
    .sandcastl-codebox {
      display: flex;
      flex-direction: column;
      // flex: 1;
      width: 33%;
      .sandcastl-codebox-title {
        background-color: #f0f0f0;
        display: flex;
        flex-direction: row;
        position: relative;
        justify-content: space-between;
        padding: 10px 10px;
      }
      .sandcastl-codebox-header {
        width: 100%;
        height: 36px;
        background-color: #f0f0f0;
        display: flex;
        flex-direction: row;
        font-size: 12px;
        position: relative;
        span {
          display: inline-flex;
          height: calc(100% - 3px);
          padding: 0 10px;
          float: left;
          align-items: center;
          cursor: pointer;
        }
        .typeActive {
          border-bottom: 3px solid #1389ea;
          color: #1389e8;
        }
      }
      .sandcastl-codebox-content {
        display: flex;
        flex: 1;
        position: relative;
        overflow: hidden;
        margin: 0 11px;
        > div {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }
  .sandcastle-footer {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    .sandcastle-footer-type {
      height: 40px;
      background-color: #f0f0f0;
      font-size: 12px;
      .typeActive {
        border-bottom: 3px solid #58f109;
        color: #58f109;
      }
      span {
        display: inline-flex;
        height: calc(100% - 3px);
        padding: 0 10px;
        float: left;
        align-items: center;
        cursor: pointer;
      }
    }
    .sandcastle-footerUl {
      width: 100%;
      background-color: #1e1e1e;
      display: flex;
      flex-direction: row;
      overflow-x: scroll;
      overflow-y: hidden;
      align-items: center;
      flex: 1;
      li {
        overflow: hidden;
        list-style: none;
        height: 120px;
        margin: 0 5px;
        position: relative;
        display: flex;
        cursor: pointer;
        width: 210px;
        flex-shrink: 0;
        box-sizing: border-box;
        div {
          display: flex;
          flex: 1;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
        }
        p {
          position: absolute;
          bottom: 0;
          height: 22px;
          background-color: rgba(0, 0, 0, 0.8);
          font-size: 12px;
          line-height: 22px;
          padding: 0 5px;
          text-align: center;
          width: calc(100% - 10px);
          color: #fff;
          font-family: -webkit-pictograph;
          overflow-x: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      li.nameActive {
        border: 1px solid #58f109;
      }
    }
  }
}
</style>
