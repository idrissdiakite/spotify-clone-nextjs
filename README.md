# Spotify clone (Nextjs + Tailwind + Spotify Api + NextAuth)

![Screenshot](screenshot.png)

Création d'un clone Spotify (basé sur le compte [ilovethistrack.com](https://open.spotify.com/user/ilovethistrack.com?si=84c31f245c86476f)) afin d'apprendre/tester le framework NextJs.

## 📍 Contexte

Via son API, Spotify offre la possibilité de récupérer de nombreuses données telles que les playlists d'un utilisateur avec tout ce que ça comprend: 
- nom des playlists
- cover des playlists
- morceaux des playlists (uniquement les 100 premiers) avec nom des artistes, album, date de sortie etc...

Il est également possibile de récupérer les musiques au sens propre (.mp3) afin de pouvoir les jouer directement sur le site. 2 possibilités:
- soit uniquement les 30 premières secondes
- ou bien alors l'entièreté du morceau mais à condition d'avoir une clé API et de se connecter au préalable (directement sur le site) à son compte Spotify. 

Pour ce projet, je suis parti sur la 2ème possibilité et ai donc utilisé plusieurs dépendances pour la partie connexion telles que "nextauth" ou bien encore "spotify web api node". Voire notamment les fichiers [...nextauth.js](https://github.com/idrissdiakite/spotify-clone-nextjs/blob/main/pages/api/auth/%5B...nextauth%5D.js) et [login.js](https://github.com/idrissdiakite/spotify-clone-nextjs/blob/main/pages/login.js).

J'ai également utilisé la dépendance "recoil" afin de garder en mémoire différents states (au sein de toute l'application) tels que l'id de la track en cours ou bien encore si un morceau est en train de jouer ou non (voir ([trackAtom.js](https://github.com/idrissdiakite/spotify-clone-nextjs/blob/main/atoms/trackAtom.js)).

## 💫 Demo

Vidéo de démonstration disponible [ici](https://youtu.be/K-TKYTH5JrM).
