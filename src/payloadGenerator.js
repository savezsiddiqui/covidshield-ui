
export const payloadGenerator = (length) => {

    const A = [];
    let b = '0x';
    for (let i = 0; i < 10; i++)
        A.push(i.toString());

    for (let i = 97; i <= 97 + 5; i++)
        A.push(String.fromCharCode(i));

    for (let i = 0; i < length; i++) {
        let l = Math.floor(Math.random() * 16);
        let r = Math.floor(Math.random() * 16);
        b += A[l] + A[r];
    }

    return b;
}