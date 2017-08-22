export class Bisect {
    public static findIndex(element: Object, arr: Object[]): number {
        let i: number = 0;
        let j: number = arr.length;

        while (i < j) {
            let mid: number = Math.floor((i + j) / 2);
            if (element < arr[mid]) {
                j = mid;
            } else {
                i = mid + 1;
            }
        }
        return i;
    }
}