module.exports = (name, money) => {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title></title>
    <link
      href="https://fonts.googleapis.com/css2?family=Lobster&family=Poppins:wght@200;600&display=swap"
      rel="stylesheet"
    />
    <style>
      * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          display: flex;
          font-family: sans-serif;
        }
        .certificate {
          background: url("https://s3-alpha-sig.figma.com/img/61fd/465e/7d003031c741d720b296199bf95ff44c?Expires=1653264000&Signature=gdH70wvbXXwG4vmEvoTYobq-y3SZ3n1CYgC2Jdo0VVwo74AbYqD-hpHEqkcLfp-UuTEdUj0FwmbAtYh2UbYYjHzlGtGsH0P-cykkT~v85EiTMPzVLzDgAH-Bke3RVyoC-UNeAEycCcv4-zc6lBo6zm4Y5BOogQjtOlBJ~7YcNK3r3wrnR4G7ayuLrtyQMZ4Ib5ED~GJ0dNwQXbzZWZmNkx~hw5PzqNmDcLxfl8sdvdmvH7duq69tFVAG7kCW-A~YV4KXA3U94Kt2vOvRF5Keuhgl7BSswnIafwuhpmoa0B2TQcjsYqrCKNcZG2xxqv2yc8dJjvl3BbgMwr9SKfsdIg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA");
          background-repeat: no-repeat;
          background-origin: content-box;
          width: 885px;
          height: 626px;
          display: flex;
          justify-content: center;
        }
        .certificate-container {
          text-align: center;
          padding: 130px;
        }
        h3 {
          font-size: 36px;
          margin-bottom: 40px;
          font-weight: 700;
          line-height: 44px;
          text-transform: uppercase;
          color: #386111;
        }
        h4 {
          font-size: 24px;
          font-weight: 700;
          line-height: 29px;
          margin-bottom: 40px;
        }
        h1 {
          font-weight: 700;
          font-size: 50px;
          line-height: 49px;
          color: #d62619;
          margin-bottom: 40px;
          font-family: "Lobster", cursive;
          font-weight: 400;
        }
        p {
          font-weight: 700;
          font-size: 24px;
          line-height: 29px;
          margin-bottom: 16px;
        }
        .certificate-signature {
          text-align: center;
        }
        img {
          width: 171px;
          height: 126px;
        }
    </style>
  </head>
  <body>
    <div class="certificate">
      <div class="certificate-container">
        <h3>Chứng nhận quyên góp</h3>
        <h4>Xin cảm ơn</h4>
        <h1>${name}</h1>
        <p>Vì đã quyên góp: <span>${money} </span>đồng</p>
        <div class="certificate-signature">
          <img
            src="https://s3-alpha-sig.figma.com/img/a23e/9cdf/df080da4af129dbd3b244f162c0833e6?Expires=1653264000&Signature=Yjc96DwwPOF4ym5TtBk2-SAy8QaQgmCDplvAZ0Jh~Yu6oOSzzaf5kb~4c247tDHod6EHrugbo7CqAC5FR6uCnhhGxPT9VUA~z73Mj0JzzlNuduYAY-C47hFzqngYkz5uNneTJ9Dhyg17TDx60U3GpaFDBw1RGkvHzzELZJUrmBecaXWYPuUQtj1zaf2sbQqKuo7-cC7saXaYRPd-FfgBl4LZQG2~~wiV1EJ9s8H3hmQ0MEiJ4a2FWHFAEovG~LdlMDcJ23NrgNTDnrq9pVq2~LetC~CtHEo7QtlAHAcXFciSKWcSowiRzfdbmfAaO5b4FzyvikVtv451aLofw~X6LQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
            alt=""
          />
        </div>
      </div>
    </div>
  </body>
</html>

    `
}