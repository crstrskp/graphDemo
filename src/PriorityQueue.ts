export interface PriorityQueueItem<T> {
    item: T;
    priority: number;
}

export class PriorityQueue<T> {
    private heap: PriorityQueueItem<T>[] = [];

    public enqueue(item: T, priority: number): void {
        const newItem = { item, priority };
        this.heap.push(newItem);
        this.heapifyUp(this.heap.length - 1);
    }

    public dequeue(): T | undefined {
        if (this.heap.length === 0) return undefined;
        if (this.heap.length === 1) return this.heap.pop()!.item;

        const root = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown(0);
        return root.item;
    }

    public peek(): T | undefined {
        return this.heap.length > 0 ? this.heap[0].item : undefined;
    }

    public isEmpty(): boolean {
        return this.heap.length === 0;
    }

    public size(): number {
        return this.heap.length;
    }

    public updatePriority(item: T, newPriority: number): boolean {
        const index = this.heap.findIndex(queueItem => queueItem.item === item);
        if (index === -1) return false;

        const oldPriority = this.heap[index].priority;
        this.heap[index].priority = newPriority;

        if (newPriority < oldPriority) {
            this.heapifyUp(index);
        } else if (newPriority > oldPriority) {
            this.heapifyDown(index);
        }
        return true;
    }

    private heapifyUp(index: number): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].priority >= this.heap[parentIndex].priority) break;

            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    private heapifyDown(index: number): void {
        while (true) {
            let minIndex = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            if (leftChild < this.heap.length && 
                this.heap[leftChild].priority < this.heap[minIndex].priority) {
                minIndex = leftChild;
            }

            if (rightChild < this.heap.length && 
                this.heap[rightChild].priority < this.heap[minIndex].priority) {
                minIndex = rightChild;
            }

            if (minIndex === index) break;

            this.swap(index, minIndex);
            index = minIndex;
        }
    }

    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}