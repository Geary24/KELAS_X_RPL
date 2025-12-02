#include <iostream>
using namespace std;

int main() {
    int n;

    cout << "Masukkan tinggi segitiga: ";
    cin >> n;

    for (int i = 1; i <= n; i++) {     // jumlah baris
        for (int j = 1; j <= i; j++) { // jumlah bintang per baris
            cout << "*";
        }
        cout << endl;
    }

    return 0;
}

