<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, getMarkAttrs }">
      <div class="menubar flex flex-wrap items-center mb-2">
        <div class="menubar__group">
          <button
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
            class="menubar__button"
          >
            <icon-format-bold class="menubar__icon" />
          </button>
          <button
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
            class="menubar__button"
          >
            <icon-format-italic class="menubar__icon" />
          </button>
          <button
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
            class="menubar__button"
          >
            <icon-format-strikethrough class="menubar__icon" />
          </button>
          <button
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
            class="menubar__button"
          >
            <icon-format-underline class="menubar__icon" />
          </button>
          <button
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
            class="menubar__button"
          >
            <icon-format-code class="menubar__icon" />
          </button>
        </div>
        <div class="menubar__group">
          <button
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
            class="menubar__button"
          >
            H2
          </button>
          <button
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
            class="menubar__button"
          >
            H3
          </button>
          <button
            :class="{ 'is-active': isActive.heading({ level: 4 }) }"
            @click="commands.heading({ level: 4 })"
            class="menubar__button"
          >
            H4
          </button>
        </div>
        <div class="menubar__group">
          <button
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
            class="menubar__button"
          >
            <icon-format-list-bulleted class="menubar__icon" />
          </button>
          <button
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
            class="menubar__button"
          >
            <icon-format-list-numbered class="menubar__icon" />
          </button>
        </div>
        <div class="menubar__group">
          <button
            :class="{ 'is-active': isActive.link() }"
            @click="showLinkPrompt(commands.link, getMarkAttrs('link'))"
            class="menubar__button"
          >
            <icon-link class="menubar__icon" />
          </button>
          <button
            :disabled="!isActive.link()"
            :class="{ 'is-disabled': !isActive.link() }"
            @click="removeLink(commands.link)"
            class="menubar__button"
          >
            <icon-link-off class="menubar__icon" />
          </button>
          <button
            @click="showImagePrompt(commands.image)"
            class="menubar__button"
          >
            <icon-add-photo class="menubar__icon" />
          </button>
          <button
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
            class="menubar__button"
          >
            <icon-format-quote class="menubar__icon" />
          </button>
          <button
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
            class="menubar__button"
          >
            <icon-format-code class="menubar__icon" />
          </button>
          <button
            @click="commands.horizontal_rule"
            class="menubar__button"
          >
            <icon-remove class="menubar__icon" />
          </button>
        </div>
        <div class="menubar__group">
          <button
            @click="commands.undo"
            class="menubar__button"
          >
            <icon-undo class="menubar__icon" />
          </button>
          <button
            @click="commands.redo"
            class="menubar__button"
          >
            <icon-redo class="menubar__icon" />
          </button>
        </div>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" class="editor__content" />
  </div>
</template>

<script>
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
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
  Image
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
            xml
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
        new Image()
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
      const src = prompt('Enter the URL of the image')
      if (src !== null) {
        command({ src })
      }
    },
    showLinkPrompt (command, attrs) {
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
.editor__content {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
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
