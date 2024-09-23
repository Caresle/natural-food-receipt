<script setup>
const store = useReceiptStore()
const loading = ref(false)

const loadReceipts = async () => {
    loading.value = true
    const result = await store.getReceipts()
    if (!result.status) {
        console.error(result.message)
        return
    }

    console.log(result.message)
    loading.value = false
}

const addReceipt = async () => {
    loading.value = true
    const result = await store.addReceipt({
        name: new Date().toLocaleString(),
    })
    if (!result.status) {
        console.error(result.message)
        return
    }

    console.log(result.message)
    loading.value = false
}

</script>

<template>
    <main class="w-full h-screen p-4 max-w-6xl">
        <header class="flex flex-col items-center justify-center gap-5">
            <div class="h-8"></div>
            <div class="bg-gradient-to-r from-purple-500 to-purple-300 flex flex-col justify-center items-center bg-clip-text">
                <h1 class="text-center font-bold text-3xl text-transparent">Nature Food Receipt</h1>
            </div>
            <h2 class="text-center font-semibold text-4xl text-slate-200">Generate your receipt in seconds</h2>
            <div class="flex gap-2">
                <button class="btn btn-primary" @click="loadReceipts" :disabled="loading">Generate Demo Receipt</button>
                <a class="btn btn-outline" href="#learn-more">Learn More</a>
            </div>
        </header>

        <section class="bg-slate-700 md:w-1/2 p-2 rounded-lg shadow mx-auto my-10">
            <div class="flex items-center justify-center gap-2">
                <h3 class="text-center font-semibold text-2xl text-white">Demo Receipt</h3>
                <div class="flex justify-center gap-2 my-2">
                    <button class="btn btn-primary" @click="addReceipt" :disabled="loading">Add</button>
                </div>
            </div>
            <div class="flex gap-2 flex-col">
                <FoodCard v-for="item in store.receipts" :key="item.id" :item="item" />
            </div>
            <div class="flex justify-center gap-2 my-2">
                <button class="btn btn-primary" v-show="store.receipts.length > 0" @click="() => store.updateReceipts([])">Save</button>
            </div>
        </section>

        <section class="flex flex-col items-center justify-center gap-5 bg-slate-700 md:w-1/2 mx-auto p-2 rounded-lg shadow" id="learn-more">
            <h2 class="text-center font-bold text-2xl text-white w-1/">Learn More</h2>
            <p class="w-10/12 font-semibold text-lg">
                This is a website made for the backend challenge #4 of the Caresle series of backend development series.
                Made using NuxtJS, TailwindCSS, and DaisyUI.
            </p>
            <button class="btn btn-secondary">Go to the challenge</button>
        </section>

        <div class="mb-32"></div>
    </main>
</template>