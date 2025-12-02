#include <iostream>
using namespace std;

int main() {
    int n;

    cout << "Masukkan tinggi segitiga: ";
    cin >> n;

    for (int i = 1; i <= n; i++) {

        // spasi di kiri
        for (int s = 1; s <= n - i; s++) {
            cout << " ";
        }

        // bintang
        for (int b = 1; b <= 2 * i - 1; b++) {
            cout << "*";
        }

        cout << endl;
    }

    return 0;
}
