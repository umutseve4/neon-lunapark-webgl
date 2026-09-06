<!-- HERO: ekran görüntüsü URL'i buraya gelecek -->

<h1 align="center">Neon Lunapark</h1>

<p align="center">
  Bir HTML dosyasını çift tıklayın; gece ışıklarıyla yanan minyatür bir lunapark açılır.<br>
  Kurulum yok, sunucu yok, indirilen tek bir görsel veya model dosyası yok.
</p>

<p align="center">
  <a href="index.html"><img src="https://img.shields.io/badge/index.html-63%20KB-FF4D4F?style=flat-square" alt="Tek dosya, 63 KB"></a>
  <img src="https://img.shields.io/badge/ba%C4%9F%C4%B1ml%C4%B1l%C4%B1k-0-FF4D4F?style=flat-square" alt="Sıfır bağımlılık">
  <img src="https://img.shields.io/badge/60-FPS-FF4D4F?style=flat-square" alt="60 FPS ölçüldü">
</p>

---

## 30 saniyede ne oluyor?

Kapalı bir ray üzerinde dört vagonluk bir tren koşuyor, virajlarda içeri yatıyor. Dönme dolap ağır ağır dönüyor, kabinleri yerçekimine asılı kalıyor. Karuselin atları süzülerek inip kalkıyor. Bilet gişesi, oyun standı ve yiyecek standı tabelalarını yakıyor. Kamera sahnenin çevresinde kendi kendine süzülüyor — siz de fareyle araya girebiliyorsunuz.

Üç düğme atmosferi baştan kuruyor:

| Mod | Ne değişir |
|---|---|
| **Gündüz** | Açık mavi gökyüzü, sıcak güneş, keskin gölgeler; neon söner |
| **Normal Gece** | Lacivert gökyüzü, yıldızlar, ay ışığı, ölçülü parıltı |
| **Festival** | Mor-macenta gökyüzü, doygun renk, güçlü bloom, hızlanmış ışık |

Geçişler ani değil: gökyüzü, sis, ışık renkleri ve bloom değerleri birbirine yumuşayarak karışır.

## Nasıl açarım?

```
1. index.html dosyasını indirin
2. Çift tıklayın
```

Üçüncü adım yok. Derleme, `npm install`, yerel sunucu gerekmez. Dosya `file://` üzerinden çalışır.

## Kontroller

| Girdi | Etki |
|---|---|
| Sürükle | Sahneyi döndür |
| Tekerlek | Yaklaş / uzaklaş |
| `1` `2` `3` | Gündüz / Normal Gece / Festival |
| `Boşluk` | Otomatik kamera turunu durdur–devam ettir |
| `←` `→` | Kamerayı elle çevir |
| `+` `−` | Zoom |

Fareyi bıraktıktan birkaç saniye sonra otomatik tur kendiliğinden devralır.

## Ölçülen performans

Chrome, masaüstü, `file://` protokolü, Festival Modu:

| Ölçüm | Değer |
|---|---|
| Kare hızı | 60 FPS |
| Sahne karmaşıklığı | 84.774 üçgen |
| Dosya boyutu | 64.472 bayt |
| Ağ isteği (Three.js dışında) | 0 |

## Nasıl yapıldı?

**Sıfır varlık.** Depoda tek bir `.glb`, `.png` veya `.jpg` yok. Her gövde kutu, silindir, tor, küre ve `TubeGeometry`'den; her doku çalışma anında bir `<canvas>` üzerine çizilip `CanvasTexture`'a dönüştürülüyor. Tabeladaki yazılar dahil.

**Ray bir eğri.** Yol `CatmullRomCurve3` ile kapalı bir eğri olarak tanımlı; trenin konumu ve viraj yatışı her karede eğrinin teğet–normal çerçevesinden türetiliyor, elle animasyon yok.

**Gökyüzü bir shader.** İçten görünen bir küre üzerinde `ShaderMaterial` gradyanı (`fog: false`, `renderOrder: -1`). Son işlem `EffectComposer` + `UnrealBloomPass` + ACES filmic ton eşleme.

**Kendini koruyor.** Cihaz gücüne göre kalite kademesi, `devicePixelRatio` sınırı, gölge ve bloom çözünürlüğü kısıntısı, kare hızı düşerse otomatik kalite indirimi, point light bütçesi 4. `webglcontextlost` yakalanıp bağlam geri kuruluyor.

**Klavyeyle çalışıyor.** Tüm kontroller tuşla erişilebilir, düğmeler 44 px dokunma hedefinde, mod değişimi `aria-live` ile duyuruluyor, `prefers-reduced-motion` saygı görüyor.

Bağımlılık: Three.js 0.169.0, ES modül `importmap` ile CDN'den. Bundler, paket yöneticisi, derleme adımı yok.

## Sınırlar

- Three.js CDN'den geldiği için ilk açılışta internet gerekir; sonrası tarayıcı önbelleğinden.
- WebGL desteği zorunlu; çok eski cihazlarda kalite kademesi düşer.
- Mobilde test edilmedi — kalite kademesi mobili hedefliyor ama ölçüm yapılmadı.

## Buradan nereye

1. **Kalabalık** — standlar arasında yürüyen, kuyruğa girip trene binen yaya figürleri.
2. **Prosedürel ses** — Web Audio osilatörleriyle ray takırtısı, karusel melodisi, doppler'lı tren geçişi. Ses dosyası yok, sıfır-varlık kuralı bozulmuyor.
3. **Vagondan bakış** — kamerayı öndeki vagona kenetleyip ray boyunca birinci şahıs sürüş; aynı eğri verisinden ikinci bir deneyim.

---

MIT — bkz. [LICENSE](LICENSE). &nbsp;·&nbsp; Made by **Opus 5**.
