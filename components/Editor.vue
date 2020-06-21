<template>
  <div class="editor">
    <editor-menu-bar v-slot="{ commands, isActive, getMarkAttrs }" :editor="editor">
      <div class="menubar flex flex-wrap items-center mb-2">
        <div class="menubar__group">
          <button
            :class="{ 'is-active': isActive.bold() }"
            class="menubar__button"
            @click="commands.bold"
          >
            <icon-format-bold class="menubar__icon" />
          </button>
          <button
            :class="{ 'is-active': isActive.italic() }"
            class="menubar__button"
            @click="commands.italic"
          >
            <icon-format-italic class="menubar__icon" />
          </button>
          <button
            :class="{ 'is-active': isActive.strike() }"
            class="menubar__button"
            @click="commands.strike"
          >
            <icon-format-strikethrough class="menubar__icon" />
          </button>
          <button
            :class="{ 'is-active': isActive.underline() }"
            class="menubar__button"
            @click="commands.underline"
          >
            <icon-format-underline class="menubar__icon" />
          </button>
          <button
            :class="{ 'is-active': isActive.code() }"
            class="menubar__button"
            @click="commands.code"
          >
            <icon-format-code class="menubar__icon" />
          </button>
        </div>
        <div class="menubar__group">
          <button
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            class="menubar__button"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </button>
          <button
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            class="menubar__button"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </button>
          <button
            :class="{ 'is-active': isActive.heading({ level: 4 }) }"
            class="menubar__button"
            @click="commands.heading({ level: 4 })"
          >
            H4
          </button>
        </div>
        <div class="menubar__group">
          <button
            :class="{ 'is-active': isActive.bullet_list() }"
            class="menubar__button"
            @click="commands.bullet_list"
          >
            <icon-format-list-bulleted class="menubar__icon" />
          </button>
          <button
            :class="{ 'is-active': isActive.ordered_list() }"
            class="menubar__button"
            @click="commands.ordered_list"
          >
            <icon-format-list-numbered class="menubar__icon" />
          </button>
        </div>
        <div class="menubar__group">
          <button
            :class="{ 'is-active': isActive.link() }"
            class="menubar__button"
            @click="showLinkPrompt(commands.link, getMarkAttrs('link'))"
          >
            <icon-link class="menubar__icon" />
          </button>
          <button
            :disabled="!isActive.link()"
            :class="{ 'is-disabled': !isActive.link() }"
            class="menubar__button"
            @click="removeLink(commands.link)"
          >
            <icon-link-off class="menubar__icon" />
          </button>
          <button
            class="menubar__button"
            @click="showImagePrompt(commands.image)"
          >
            <icon-add-photo class="menubar__icon" />
          </button>
          <button
            :class="{ 'is-active': isActive.blockquote() }"
            class="menubar__button"
            @click="commands.blockquote"
          >
            <icon-format-quote class="menubar__icon" />
          </button>
          <button
            :class="{ 'is-active': isActive.code_block() }"
            class="menubar__button"
            @click="commands.code_block"
          >
            <icon-format-code class="menubar__icon" />
          </button>
          <button
            class="menubar__button"
            @click="commands.horizontal_rule"
          >
            <icon-remove class="menubar__icon" />
          </button>
        </div>
        <div class="menubar__group">
          <button
            class="menubar__button"
            @click="commands.undo"
          >
            <icon-undo class="menubar__icon" />
          </button>
          <button
            class="menubar__button"
            @click="commands.redo"
          >
            <icon-redo class="menubar__icon" />
          </button>
        </div>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" class="editor__content content" />
  </div>
</template>

<script>
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import php from 'highlight.js/lib/languages/php'
import shell from 'highlight.js/lib/languages/shell'
import sql from 'highlight.js/lib/languages/sql'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  CodeBlockHighlight,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Underline,
  Strike,
  History,
  Image,
  Placeholder
} from 'tiptap-extensions'
import IconFormatBold from '~/components/icons/IconFormatBold'
import IconFormatItalic from '~/components/icons/IconFormatItalic'
import IconFormatUnderline from '~/components/icons/IconFormatUnderline'
import IconFormatStrikethrough from '~/components/icons/IconFormatStrikethrough'
import IconFormatListBulleted from '~/components/icons/IconFormatListBulleted'
import IconFormatListNumbered from '~/components/icons/IconFormatListNumbered'
import IconFormatCode from '~/components/icons/IconFormatCode'
import IconFormatQuote from '~/components/icons/IconFormatQuote'
import IconRemove from '~/components/icons/IconRemove'
import IconUndo from '~/components/icons/IconUndo'
import IconRedo from '~/components/icons/IconRedo'
import IconAddPhoto from '~/components/icons/IconAddPhoto'
import IconLink from '~/components/icons/IconLink'
import IconLinkOff from '~/components/icons/IconLinkOff'

export default {
  name: 'Editor',
  components: {
    IconLinkOff,
    IconLink,
    IconAddPhoto,
    IconRedo,
    IconUndo,
    IconRemove,
    IconFormatQuote,
    IconFormatCode,
    IconFormatListNumbered,
    IconFormatListBulleted,
    IconFormatStrikethrough,
    IconFormatUnderline,
    IconFormatItalic,
    IconFormatBold,
    EditorContent,
    EditorMenuBar
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editor: null,
      linkUrl: null,
      linkMenuIsActive: false,
      html: ''
    }
  },
  mounted () {
    this.html = this.value

    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new CodeBlockHighlight({
          languages: {
            javascript,
            css,
            xml,
            php,
            yaml,
            sql,
            bash,
            shell
          }
        }),
        new HardBreak(),
        new Heading({ levels: [2, 3, 4] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Underline(),
        new Strike(),
        new History(),
        new Image(),
        new Placeholder({
          emptyEditorClass: 'is-editor-empty',
          emptyNodeClass: 'is-empty',
          emptyNodeText: 'Write...',
          showOnlyWhenEditable: true,
          showOnlyCurrent: true
        })
      ],
      content: this.html,
      onUpdate: ({ getHTML }) => {
        this.html = getHTML()
        this.$emit('input', this.html)
      }
    })
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  methods: {
    showImagePrompt (command) {
      // eslint-disable-next-line no-alert
      const src = prompt('Enter the URL of the image')
      if (src !== null) {
        command({ src })
      }
    },
    showLinkPrompt (command, attrs) {
      // eslint-disable-next-line no-alert
      const href = prompt('Enter the URL', attrs.href)
      if (href !== null) {
        command({ href })
      }
    },
    removeLink (command) {
      command({ href: null })
    }
  }
}
</script>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  height: 80vh;
}

.menubar {
  flex: 0 1 auto;
}

.editor__content {
  flex: 1 1 auto;
  overflow: auto;
}

.menubar__button {
  @apply p-2 mb-2 bg-gray-300 font-bold rounded;
  min-width: 40px;
}

.menubar__button:focus {
  outline: none;
}

/*noinspection CssUnusedSymbol*/
.menubar__button.is-active,
.menubar__button:hover {
  @apply bg-gray-400;
}

/*noinspection CssUnusedSymbol*/
.menubar__button.is-disabled {
  @apply opacity-50 cursor-not-allowed;
}
/*noinspection CssUnusedSymbol*/
.menubar__button.is-disabled:hover {
  @apply bg-gray-300 opacity-50;
}

.menubar__icon {
  @apply w-6 h-6;
}

.menubar__group {
  display: inline-flex;
}

.menubar__group .menubar__button {
  @apply rounded-none;
}

.menubar__group .menubar__button:first-child {
  @apply rounded-l;
}

.menubar__group .menubar__button:last-child {
  @apply rounded-r mr-2;
}
</style>
