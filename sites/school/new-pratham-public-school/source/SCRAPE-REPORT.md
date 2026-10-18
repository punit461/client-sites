# New Pratham Public School — content scrape for redesign

Captured 2026-10-18 from `http://www.newprathampublicschool.in/` and the school's Google Maps listing.

## Folder layout

```
README.md                         this file
website-content/
  pages/*.md                      one markdown file per page: meta, heading outline, body, tables, images, links, forms
  all-text-combined.md            every page's body text in one file, plus gallery album map and video list
  all-pages.json                  machine-readable dump of every page (headings, links, images, tables, forms, markdown, visible text)
  site-map.json                   crawl map: pages, navigation tree, external links, asset manifest, errors
  header.html / footer.html       the shared header and footer HTML as served
  photo-gallery-albums.json       38 album titles -> image files
  video-gallery.json              11 YouTube videos with titles, IDs, watch/embed URLs, local thumbnails
  raw-html/*.html                 untouched HTML of every page
  assets/images/...               logo, portraits, gallery and achievement images, original filenames (90 MB)
  assets/newpratham/              the 6 hero carousel slides and the decorative butterfly PNG
  assets/documents/               mandatory-disclosure.pdf
  assets/video-thumbnails/        YouTube thumbnails for the video gallery
  security-findings/              see "Security finding" below
google-maps-content/
  listing-details.json            name, address, phone, hours, plus code, coordinates, tabs, related listings
  photos-manifest.json            all 37 gallery items with upload date, uploader, original size, URLs, local file
  photos/                         36 photos at original resolution + 1 Street View still (71 MB)
  videos/                         the one Maps video in 1080p / 720p / 360p MP4 (12 MB)
```

## Website: what exists

The site is a PHP template by InfoLynx (Bootstrap 4, Font Awesome, AOS animations, DataTables). 14 pages, all HTTP 200, all sharing the same `<title>` and empty meta description/keywords.

Navigation as served:

- Home (`index.php`)
- About Us (`about.php`)
- Facilities (`facilities.php`)
- Admissions (`admissions.php`)
- Gallery → Photos (`photogallery.php`), Videos (`videogallery.php`)
- Resources → Notice board, Careers, Circulars, Teachers, Achievements, Clubs, Books (PDF link)
- Contact Us (`contact.php`)
- Mandatory Disclosure (`/mandatorydisclosure`, serves a PDF)
- Footer also links Past Students TC (`paststudentstc.php`), Facebook, Instagram, WhatsApp, and an empty LinkedIn link.

| Page | Real content? | What is there |
| --- | --- | --- |
| Home | Yes | 6-slide hero carousel, "What we offer" (Vision, Mission, Learning Process, Creative Lessons), "A few words about us" blurb, footer. "About School" and "Parent's Feedback" sections render **empty** (no data). |
| About Us | Yes | School history (est. 2010, Sree Venkateshwara Charitable Trust, CBSE Nursery–X), aims, facilities paragraph, messages from Chairman, Managing Trustee and Principal with photos. |
| Achievements | Yes | 6 award/competition items with image, title and paragraph. |
| Photo gallery | Yes | 38 albums, 61 images (4 albums have a title but no image). |
| Video gallery | Yes | 11 YouTube embeds with titles. |
| Facilities | **No** | Empty carousel. |
| Admissions | **No** | Single link to the Android app "Admission Enquiry Form" (Play Store `com.vskol.newpratham`). |
| Contact | **No** | "Request a call back" form (name, email, phone, message → `contactsave.php`). No address, map, or email on the page. |
| Teachers | **No** | Empty table (SL NO., NAME, DESIGNATION, QUALIFICATION). |
| Past Students TC | **No** | Empty table (SL NO., BATCH, CLASS, NAME, ACTION). |
| Careers | **No** | "Available Jobs" heading with an "All Locations" filter button, no jobs. |
| Notice board / Circulars / Clubs | **No** | Heading only. |

Key facts scattered across the site:

- Tagline under logo: "Affiliated to CBSE New Delhi, Affiliation Number: 830770"
- Email in header: newpratham@gmail.com
- Phone in footer: 080 - 40954645; WhatsApp 7204347528
- Location in footer: "Bangalore, India." (the full address only appears on Google Maps)
- Social: Facebook profile id 61574280760755, Instagram @newprathampublicschool
- Copyright "© 2024 All Rights Reserved InfoLynx"
- Chairman Dr. S. G. Prakash Rao Sathe, Managing Trustee Dr. Neetha Sathe, Principal Shri Jeevarathnam Reddy
- The source copy has many typos (e.g. "argis", "conceot", "eqipped", "dacade"); they are preserved verbatim in the page files so the redesign can decide what to fix.

Assets: 79 files fetched from the site (logo, 6 hero slides, 1 decorative PNG, 3 leadership portraits, 61 gallery images, 6 achievement images, the mandatory-disclosure PDF). 11 gallery/achievement images were uploaded with broken extensions (`.02`, `.17`, trailing dot); they are JPEGs and a `.jpg` copy sits beside each original.

## Security finding (please pass to the school / host)

The "Books" link in the Resources menu points to `images/books/books.pdf`, but the server returns **PHP source for a web shell**, not a PDF. It accepts a POST parameter, decrypts commands with an embedded RSA public key and `eval()`s them. This indicates the hosting account has been compromised at some point. The file itself is deliberately not kept in this repository, so antivirus scanners do not flag clones; the school or its host can verify by requesting the URL above. The response begins:

```
<?pHp
class A{ var $test="demo";function __wakeup(){$pk='-----BEGIN PUBLIC KEY-----
...
$pass = $_POST['mxx']; ... unserialize($pp);
?>
```
 Recommend the school's host scan and clean the account before any new site is deployed to the same hosting.

## Google Maps listing

- Name: New Pratham Public School (Kannada: ನ್ಯೂ ಪ್ರಥಮ್ ಪಬ್ಲಿಕ್ ಸ್ಕೂಲ್), category "CBSE School"
- Address: 2nd Main Rd, Pai Layout, Dooravani Nagar, Bengaluru, Karnataka 560093
- Plus code XMR8+VJ; coordinates 12.9921823, 77.6665202
- Phone: 080 2272 5593 (differs from the website's 080 40954645)
- Hours: Mon–Sat 7:30 am – 3:30 pm, Sunday closed
- Website link on the listing: newprathampublicschool.in
- **No reviews and no star rating**: the listing only has Overview and About tabs. Posting is turned off.
- Gallery: 38 items listed = 1 video + 36 photos + 1 Street View panorama. All captured; 9 different contributors (none appear to be the school's own account). Dates range Aug 2017 – Apr 2024.
- The video (15 s, Nov 2019, by Siva Prakash) is saved in three qualities under `google-maps-content/videos/`.
- Related listings Google shows under "People also search for": Presidency School Kasturinagar, Pratham International School, Pragathi School, NPS KR Puram, NPS Hope Farm.

## How it was captured

Website pages and assets were fetched with a Node crawler (cheerio + turndown). Google Maps was read through a browser session; photo files were pulled at original resolution via Google's `=s0` suffix and the video via the `=m37/=m22/=m18` suffixes on the same media ID. YouTube videos were not downloaded, only their IDs, titles and thumbnails.
