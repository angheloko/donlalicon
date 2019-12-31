<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar inline-flex items-center mb-2">
        <button
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
          class="menubar__button rounded-l"
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
          class="menubar__button rounded-r"
        >
          <icon-format-code class="menubar__icon" />
        </button>

        <button
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
          class="menubar__button font-bold rounded-l ml-2"
        >
          H2
        </button>
        <button
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
          class="menubar__button font-bold rounded-r"
        >
          H3
        </button>

        <button
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
          class="menubar__button rounded-l ml-2"
        >
          <icon-format-list-bulleted class="menubar__icon" />
        </button>
        <button
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
          class="menubar__button rounded-r"
        >
          <icon-format-list-numbered class="menubar__icon" />
        </button>

        <button
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
          class="menubar__button rounded-l ml-2"
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
          class="menubar__button rounded-r"
        >
          <icon-remove class="menubar__icon" />
        </button>

        <button
          @click="commands.undo"
          class="menubar__button rounded-l ml-2"
        >
          <icon-undo class="menubar__icon" />
        </button>
        <button
          @click="commands.redo"
          class="menubar__button rounded-r"
        >
          <icon-redo class="menubar__icon" />
        </button>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" class="editor__content" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
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
  History
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

export default {
  name: 'NewPage',
  components: {
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
  data () {
    return {
      editor: null
    }
  },
  mounted () {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [2, 3] }),
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
        new History()
      ],
      content: ''
    })
  },
  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>

<style scoped>
.menubar__button {
  @apply p-2;
  @apply bg-gray-300;
  min-width: 40px;
}

/*noinspection CssUnusedSymbol*/
.menubar__button.is-active,
.menubar__button:hover {
  @apply bg-gray-400;
}
.menubar__icon {
  @apply w-6;
  @apply h-6;
}
</style>
