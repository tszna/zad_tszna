Projekt uruchomiony przy pomocy dockera jak i lokalnie działa dokładnie w ten sam sposób:
<p><b>API:</b> http://localhost:8000</p>
<p><b>UI:</b> http://localhost:4200</p>

Na samym początku widoku jest lista danych pobranych przez API, a pod listą jest przycisk, którego kliknięcie powoduje wysłanie do API "losowych" danych, API te dane weryfikuje i na podstawie owej weryfikacji zwraca odpowiedzć. Treść odpowiedzi zależy od tego jakie dane zostały wysłane w zapytaniu. Odpowiedź wyświetla się pod przyciskiem.