import { defineStore } from 'pinia'
import { del, get, post, put } from '~/lib/axios'

interface Receipt {
    id: number,
    name: string,
}

const BASE_PATH = 'receipts'

export const useReceiptStore = defineStore('receipt', () => {
    const receipts : Ref<Receipt[]> = ref([])

    const getReceipts = async () => {
        const data = await get(BASE_PATH)
        if (!data) return { status: false, message: 'Failed to fetch receipts' }
        console.log(data)
        
        receipts.value = data
        return { status: true, message: 'Receipts fetched successfully' }
    }

    const addReceipt = async (receipt: Omit<Receipt, 'id'>) => {
        const data = await post(BASE_PATH, receipt)
        if (!data) return { status: false, message: 'Failed to add receipt' }

        receipts.value.push(data)
        return { status: true, message: 'Receipt added successfully' }
    }

    const putReceipt = async (receipt: Receipt) => {
        const data = await put(`${BASE_PATH}/${receipt.id}`, receipt)
        if (!data) return { status: false, message: 'Failed to update receipt' }

        const index = receipts.value.findIndex((item: Receipt) => item.id === receipt.id)
        receipts.value[index] = receipt
        return { status: true, message: 'Receipt updated successfully' }
    }

    const deleteReceipt = async (id: number) => {
        const data = await del(`${BASE_PATH}/${id}`)
        if (!data) return { status: false, message: 'Failed to delete receipt' }

        receipts.value = receipts.value.filter((item: Receipt) => item.id !== id)
        return { status: true, message: 'Receipt deleted successfully' }
    }

    const updateReceipts = (receipt: any[]) => {
        receipts.value = receipt
    }

    return {
        receipts,
        updateReceipts,
        getReceipts,
        addReceipt,
        putReceipt,
        deleteReceipt,
    }
})