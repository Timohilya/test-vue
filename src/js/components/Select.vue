<template>
    <div class="custom-select">
        <p class="custom-select__label" v-if="label">{{ label }}</p>
        <div class="custom-select__wrapper">
            <div class="custom-select__main"
                 :class="{ open: isOpen }"
                 @click="toggleSelect()">
                <p class="custom-select__option">{{ selected.name }}</p>
            </div>
            <div class="custom-select__options" :class="{ open: isOpen }">
                <div class="custom-select__option"
                    v-for="(option, k) of options"
                    :key="k"
                    @click="select(option)">
                    {{ option.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Select',
    props: [
        'label', 
        'options'
    ],
    data() {
        return {
            selected: this.options.find(el => el.hasOwnProperty('selected')),
            isOpen: false
        }
    },
    emits: ['update:modelValue'],
    methods: {
        
        toggleSelect() {
            if ( !this.isOpen ) {
                let event = new Event('selectonclick')
                document.dispatchEvent(event)
            }
            this.isOpen = !this.isOpen
        },

        select(item) {
            this.selected = item
            this.$emit('update:modelValue', item.value)
            this.closeSelect()
        },
        
        closeSelect() {
            this.isOpen = false
        },

        outerClick() {
            document.addEventListener("click", event => {
                if ( !this.isOpen ) return false
                const classList = event.target.classList
                if ( !classList.contains("custom-select__main") &&  !classList.contains("custom-select__options") && !classList.contains("custom-select__option") ) {
                    console.log('close on outher click')
                    this.closeSelect()
                }
            })
        },

    },
    mounted() {
        this.outerClick()

        document.addEventListener('selectonclick', () => { 
            if ( this.isOpen ) this.closeSelect()
        }, false)
    }
}
</script>
