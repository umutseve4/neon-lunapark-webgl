# Neon Lunapark — tek dosyalık 3D sahne

Gece ışıklarıyla yanan minyatür bir lunapark. Tarayıcıda açılır, kurulum yoktur, sunucu istemez.

**[index.html](index.html)** dosyasını indirip çift tıklayın — hepsi bu.

## Ne göreceksiniz

- **Roller coaster**: kapalı bir ray üzerinde, virajlarda yatarak (banking) ilerleyen 4 vagonluk tren
- **Dönme dolap**: yavaş dönen çark; kabinler yerçekimine göre asılı kalır
- **Karusel**: kendi ekseninde dönen, atları yukarı-aşağı süzülen atlıkarınca
- **Bilet gişesi, oyun standı, yiyecek standı**: tenteleri, tezgâhları, ışıklı tabelalarıyla
- **Neon**: yazılar, kemerler ve nabız gibi atan ışık zincirleri
- Kamera sahnenin çevresinde yavaşça süzülür; siz de fareyle müdahale edebilirsiniz

## Üç atmosfer

| Mod | Ne değişir |
|---|---|
| **Gündüz** | Açık mavi gökyüzü, sıcak güneş ışığı, keskin gölgeler, neon söner |
| **Normal Gece** | Lacivert gökyüzü, yıldızlar, ay ışığı, ölçülü neon parıltısı |
| **Festival Modu** | Mor-macenta gökyüzü, doygun renkler, güçlü bloom, hızlanmış ışık animasyonları |

Mod geçişleri anlık değil: gökyüzü, sis, ışık renkleri ve bloom değerleri yumuşak bir geçişle (smoothstep) birbirine karışır.

## Kontroller

| Girdi | Etki |
|---|---|
| Fareyi sürükleyin / parmakla kaydırın | Sahneyi yörüngede döndürün |
| Tekerlek / iki parmak | Yaklaş–uzaklaş |
| `1` `2` `3` | Gündüz / Normal Gece / Festival |
| `Boşluk` | Otomatik kamera turunu durdur–devam ettir |
| `←` `→` | Kamerayı elle çevir |
| `+` `−` | Zoom |

Fareyi bıraktıktan birkaç saniye sonra otomatik kamera turu kendiliğinden devralır.

## Teknoloji notu

- **Three.js 0.169.0**, ES modül `importmap` ile CDN'den; build adımı, paket yöneticisi, bundler yok
- **Sıfır varlık**: hiçbir `.glb`, `.png`, `.jpg` yok. Bütün geometri kutu, silindir, tor, küre ve `TubeGeometry`'den; bütün dokular çalışma anında `<canvas>` üzerine çizilip `CanvasTexture`'a dönüştürülüyor
- Ray, `CatmullRomCurve3` ile kapalı bir eğri; tren pozisyonu ve yatış açısı her karede eğrinin teğet/normal çerçevesinden türetiliyor
- Gökyüzü, içten görünen bir küre üzerinde çalışan `ShaderMaterial` gradyanı (`fog: false`, `renderOrder: -1`)
- Son işlem: `EffectComposer` + `UnrealBloomPass` + `OutputPass`, ACES filmic ton eşleme
- **Performans koruması**: cihaz gücüne göre kademe seçimi, `devicePixelRatio` sınırı, gölge ve bloom çözünürlüğü kısıntısı, FPS düşerse otomatik kalite indirimi, point light bütçesi 4 ile sınırlı
- **Erişilebilirlik**: tüm kontroller klavyeyle çalışır, düğmeler 44 px dokunma hedefi, mod değişimi `aria-live` ile ekran okuyucuya bildirilir, `prefers-reduced-motion` saygı görür
- `webglcontextlost` / `webglcontextrestored` olayları yakalanır, bağlam kurtarılır

## Geliştirme önerileri

1. **Yolcu ve kalabalık**: standlar arasında yürüyen basit yaya ajanları, kuyruğa girip bilet alan ve trene binen figürler — sahne canlı bir yere dönüşür.
2. **Web Audio ile prosedürel ses**: dosya kullanmadan osilatörle ray takırtısı, karusel melodisi ve doppler etkili tren geçişi; ses tamamen kodla üretilir, sıfır-varlık kuralı korunur.
3. **Vagondan birinci şahıs görüş**: `C` tuşuyla kamerayı öndeki vagona kenetleyip ray boyunca sürüş; aynı eğri verisi ikinci bir deneyim üretir.

## Doğrulama durumu — açık beyan

Kod, tarayıcısız bir ortamda sahte (mock) bir THREE ve DOM katmanıyla 30 kare boyunca üç modda da hatasız çalıştırıldı; `index.html` bu depoya bayt-bayt aynı olacak şekilde yerleştirildi (64.472 bayt, md5 `52dc5bcb8ea52c5e0b0101090a653690`, CI tarafından doğrulandı). **Gerçek bir WebGL bağlamında görsel test yapılamadı** — üretildiği ortamda tarayıcı yoktu. Görsel sonucu kendi tarayıcınızda doğrulayın.

## Lisans

MIT — bkz. [LICENSE](LICENSE).

---

Made by **Opus 5**.
