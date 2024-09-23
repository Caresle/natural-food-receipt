<script setup>
const {item} = defineProps({
    item: {
        type: Object,
        default: () => ({})
    }
})

const store = useReceiptStore()
const loading = ref(false)

const deleteReceipt = async () => {
    loading.value = true
    const result = await store.deleteReceipt(item.id)
    if (!result.status) {
        loading.value = false
        console.error(result.message)
        return
    }

    loading.value = false
    console.log(result.message)
}

const updateReceipt = async () => {
    loading.value = true
    const result = await store.putReceipt({id: item.id, name: new Date().toLocaleString()})
    if (!result.status) {
        loading.value = false
        console.error(result.message)
        return
    }

    loading.value = false
    console.log(result.message)
}

</script>

<template>
    <div class="bg-slate-600 p-2 rounded-lg flex items-center gap-2">
        <div class="size-8 bg-slate-400 rounded-lg text-slate-900 flex items-center justify-center font-semibold">
            {{ item?.name?.slice(0, 1) }}
        </div>
        <div class="flex gap-1 justify-between w-full items-center">
            <div>
                {{ item?.name }}
            </div>
            <div class="flex gap-1">
                <button class="btn btn-sm btn-outline" :disabled="loading" @click="updateReceipt">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                </button>
                <button class="btn btn-error btn-sm" @click="deleteReceipt" :disabled="loading">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>