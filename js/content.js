(function () {
  'use strict';

  const DEFAULT_CERTIFICATES = [
    '/thumb/2/GzcN41apvEzPsDHAz1A3nQ/r/d/litsenziya-novyy-1.jpg',
    '/thumb/2/Or-kD9_TrUa8VonNkRiu1Q/r/d/litsenziya-novyy-2.jpg',
    '/thumb/2/3eVUpJsa1OKWBnnG5UV7Nw/r/d/svidetelstvo-o-gos-registratsii-original.jpg',
  ];

  const DEFAULT_GALLERY_IMAGES = [
    '/thumb/2/Q9xIb4gpWzPvw0cyA62uXQ/550c350/d/img-20170426-wa0076.jpg',
    '/thumb/2/s7IkmRKHCQTE1fEVQfjLew/550c350/d/img-20170426-wa0015.jpg',
    '/thumb/2/iZmFaOnMiCg1r-knRq-xPg/550c350/d/img_0202.jpg',
    '/thumb/2/UgqTXDjXWEc9-i6-nnu4qA/550c350/d/20140613-0002.jpg',
    '/thumb/2/YT18_7ihKeZ1J31aTWXFGg/550c350/d/r416s1.jpg',
    '/thumb/2/TKwMgNbWUNwJtRXL-NlcLg/550c350/d/soilmec-r312hd-obr2.jpg',
    '/thumb/2/O4VFTA1Pr_cFdfmluuouxA/550c350/d/minipogruzchik.jpg',
    '/thumb/2/F4Cmo10nY_NEhnxHB2NTcw/550c350/d/mait_t_80_04.jpg',
    '/thumb/2/Uda_fXtuNLDMsNgMkxSwgw/550c350/d/liebherr_921.jpg',
    '/thumb/2/Ad4WamwCmLYiZPHUBqewyQ/550c350/d/2.jpg',
    '/thumb/2/PY_ibdDfXT4mPeny-mlsKg/550c350/d/3.jpg',
  ];

  const DEFAULT_PROJECTS = [
    '\u0422\u041e\u041e "\u0421\u041a \u0411\u0430\u0440\u043b\u0430\u0441 \u041a\u0443\u0440\u044b\u043b\u044b\u0441" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 03.06.2017',
    '\u0422\u041e\u041e "\u0421\u041a \u0411\u0430\u0437\u0438\u0441" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 19.01.2017',
    '\u0422\u041e\u041e \u00ab\u041a\u0443\u0440\u044b\u043b\u044b\u0441\u0448\u044b-\u0422\u0411\u0421\u00bb \u2014 \u0433. \u041a\u0430\u0441\u043a\u0435\u043b\u0435\u043d 19.09.2016',
    '\u0422\u041e\u041e \u00ab\u0417\u0418-\u0414\u0410\u041d\u00bb \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 01.07.2016',
    '\u0422\u041e\u041e \u00ab\u041d\u0423\u0420-Pavlodar\u00bb \u2014 \u0433. \u041f\u0430\u0432\u043b\u043e\u0434\u0430\u0440 09.02.2016',
    '\u0422\u041e\u041e \u00ab\u0410\u043b\u0432\u0438\u0441\u00bb \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 02.12.2015',
    '\u0422\u041e\u041e \u00ab\u0421\u0430\u0440\u0443\u0445\u0430\u043d\u00bb \u2014 \u0433. \u041a\u0430\u0440\u0430\u0433\u0430\u043d\u0434\u0430 12.11.2015',
    '\u0422\u041e\u041e \u00ab\u0416\u043e\u043b\u0430\u043c\u0430\u043d \u2013 2030\u00bb \u2014 \u0433. \u041a\u0430\u0440\u0430\u0433\u0430\u043d\u0434\u0430 12.08.2015',
    '\u041e\u041e\u041e \u00ab\u041c\u0435\u0433\u0430\u043b\u0430\u0439\u043d\u00bb \u2014 \u0433. \u0410\u0441\u0442\u0430\u043d\u0430 16.07.2015',
    '\u0422\u041e\u041e \u00ab\u0421\u041c\u0423-33\u00bb \u2014 \u0433. \u0410\u0441\u0442\u0430\u043d\u0430 26.06.2015',
    '\u0422\u041e\u041e \u00ab\u0423\u043b\u0430\u043d \u0421\u0435\u0440\u0432\u0438\u0441\u00bb \u2014 \u0433. \u0410\u0441\u0442\u0430\u043d\u0430 06.05.2015',
    '\u0422\u041e\u041e \u00ab\u0428\u0411\u041a-\u0421\u0442\u0440\u043e\u0439\u043c\u043e\u043d\u0442\u0430\u0436 \u0421\u0435\u0440\u0432\u0438\u0441\u00bb \u2014 \u0433. \u041a\u0430\u0440\u0430\u0433\u0430\u043d\u0434\u0430 27.04.2015',
    '\u0422\u041e\u041e \u00ab\u0424\u0438\u0440\u043c\u0430 \u0421\u0442\u0430\u043b\u044c\u043c\u043e\u043d\u0442\u0430\u0436\u00bb \u2014 \u0433. \u041f\u0430\u0432\u043b\u043e\u0434\u0430\u0440 28.08.2014',
    '\u0422\u041e\u041e \u00ab\u0422\u041e\u041b\u0410\u0413\u0410\u0419 \u2013 2050\u00bb \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 21.08.2014',
    '\u0422\u041e\u041e \u00ab\u0410\u043b\u043c\u0430\u0442\u044b\u0414\u043e\u0440\u0421\u0442\u0440\u043e\u0439\u00bb \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 25.07.2014',
    '\u0422\u041e\u041e \u00ab\u041e\u0421\u041a - \u0421\u0442\u0440\u043e\u0439 \u0421\u0435\u0440\u0432\u0438\u0441\u00bb \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 22.07.2014',
    '\u0422\u041e\u041e \u00ab\u0424\u0438\u0440\u043c\u0430 \u0421\u0442\u0430\u043b\u044c\u043c\u043e\u043d\u0442\u0430\u0436\u00bb \u2014 \u0433. \u042d\u043a\u0438\u0431\u0430\u0441\u0442\u0443\u0437 05.06.2014',
    '\u00ab\u041a\u043e\u043c\u043f\u0430\u043d\u0438\u044f \u0421\u0442\u0440\u043e\u0439 \u041a\u0430\u043f\u0442\u0438\u0430\u043b\u00bb \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 07.05.2014',
    '\u0422\u041e\u041e \u00ab\u041f\u041c\u041a 615\u00bb \u2014 \u0433. \u0428\u044b\u043c\u043a\u0435\u043d\u0442 12.03.2014',
    '\u0422\u041e\u041e \u00ab\u0422\u041f\u041a \u00ab\u041e\u0440\u043b\u0435\u0443\u00bb \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 22.01.2014',
    '\u0422\u041e\u041e \u00ab\u0411\u0410\u0419-\u041c\u0410\u0414 \u041a\u0443\u0440\u044b\u043b\u044b\u0441\u00bb \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 22.11.2013',
    '\u0422\u041e\u041e \u00ab\u041c\u0410\u0413\u041d\u0415\u0422\u0418\u041a\u00bb \u2014 \u0433. \u041a\u0430\u043f\u0447\u0430\u0433\u0430\u0439 19.08.2013',
    '\u0422\u041e\u041e \u00ab\u0410\u0437\u0438\u044f \u042d\u043b\u0435\u043a\u0442\u0440\u043e \u041a\u043e\u043c\u043f\u043b\u0435\u043a\u0442\u00bb \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 16.06.2013',
    '\u0422\u041e\u041e \u00ab\u0414\u0430\u0443\u043b\u0435\u0442 \u0421\u0435\u0440\u043f\u0438\u043d 603\u00bb \u2014 \u0441\u0442. \u0427\u0435\u043c\u043e\u043b\u0433\u0430\u043d 22.10.2012',
    '\u0422\u041e\u041e \u00ab\u0422\u0435\u043c\u0438\u0440 \u0421\u0442\u0440\u043e\u0439 \u0421\u0435\u0440\u0432\u0438\u0441 \u0438 \u041a\u043e\u00bb \u2014 \u043f\u043e\u0441. \u041c\u0435\u0440\u043a\u0435 12.10.2012',
    '\u0422\u041e\u041e \u00ab\u0411\u0430\u043a\u0430\u0439 \u0421\u0442\u0440\u043e\u0439\u00bb \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 19.09.2012',
    '\u0410\u041e \u00ab\u041a\u0430\u0437\u0440\u0435\u043c\u044d\u043d\u0435\u0440\u0433\u043e\u00bb \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 13.09.2012',
    '\u0422\u041e\u041e \u00ab\u041f\u041c\u041a \u2013 7\u041a\u00bb \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 17.08.2012',
    '\u0422\u041e\u041e \u00ab\u0424\u0438\u0440\u043c\u0430 \u0410\u041c\u041e\u00bb \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 15.08.2012',
    '\u0422\u041e\u041e \u00ab\u041a\u0430\u0440\u0438\u043d\u0430 Paper\u00bb \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 15.08.2012',
    '\u0422\u041e\u041e \u00ab\u0414\u0438\u0437\u0430\u0439\u043d\u0421\u0442\u0440\u043e\u0439 \u041f\u0421\u041a\u00bb \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 03.11.2011',
    '\u0422\u041e\u041e \u00ab\u0421\u041c\u041f-306\u00bb \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 30.09.2011',
    '\u0422\u041e\u041e \u00ab\u041f\u041c\u041a \u2013 615\u00bb \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 13.07.2011',
    '\u0422\u041e\u041e \u00ab\u0414\u0436\u0430\u0433\u0430\u0442\u00bb \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 28.06.2011',
    '\u0422\u041e\u041e "\u0422\u0435\u043f\u043b\u043e\u0441\u0435\u0442\u044c\u0441\u0442\u0440\u043e\u0439" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b (\u043c\u043d\u043e\u0433\u043e\u043a\u0440\u0430\u0442\u043d\u043e)',
    '\u0422\u041e\u041e "\u042d\u043d\u0435\u0440\u0433\u043e\u0436\u0438\u043b\u0441\u0442\u0440\u043e\u0439 \u0421\u0424" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 05.10.2007',
    '\u0422\u041e\u041e "Racurs Building Company" 08.08.2007',
    '\u0422\u041e\u041e "\u0421\u0430\u0443\u043b\u0435\u0442\u0442 \u041a\u0443\u0440\u044b\u043b\u044b\u0441" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b',
    '\u0422\u041e\u041e "\u0421\u0435\u0432\u0435\u0440-\u0421\u0442\u0440\u043e\u0439 \u0413\u0440\u0443\u043f\u043f" \u2014 \u0433. \u0410\u0441\u0442\u0430\u043d\u0430 20.12.2006',
    '\u0422\u041e\u041e "Toku Capital" \u2014 \u0433. \u0410\u0441\u0442\u0430\u043d\u0430 13.12.2006',
    '\u0422\u041e\u041e "\u041a\u0410\u041f-BUILD" \u2014 \u0433. \u0410\u0441\u0442\u0430\u043d\u0430 10.11.2006',
    '\u0422\u041e\u041e "BLOK-AST" \u2014 \u0433. \u0410\u0441\u0442\u0430\u043d\u0430',
    '\u0424\u0438\u043b\u0438\u0430\u043b \u041a\u043e\u0440\u043f\u043e\u0440\u0430\u0446\u0438\u044f \u0410\u041e "KUAT"',
    '\u0422\u041e\u041e "\u0410\u0441\u0442\u0430\u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0441" 11.05.2006',
    '\u0422\u041e\u041e "\u0410\u041b-\u0414\u041e\u0421" \u2014 \u0433. \u0410\u0441\u0442\u0430\u043d\u0430 11.05.2006',
    '\u0422\u041e\u041e "\u0411\u0440\u0430\u0437\u0435\u0440\u0441 \u041a\u043e\u043c\u043f\u0430\u043d\u0438" \u2014 \u0433. \u0410\u0441\u0442\u0430\u043d\u0430',
    '\u0422\u041e\u041e "\u0410\u0411\u041a-\u0421\u041c\u0423-1" \u2014 \u0433. \u0410\u0441\u0442\u0430\u043d\u0430 23.06.2005',
    '\u0422\u041e\u041e "\u0410\u0440\u043a\u0430-\u041a\u0443\u0440\u044b\u043b\u044b\u0441" \u2014 \u0433. \u0410\u0441\u0442\u0430\u043d\u0430 12.04.2005',
    '\u0422\u041e\u041e "\u0410\u0442\u043b\u0430\u043d\u0442-\u0418\u043d\u0436\u0438\u043d\u0438\u0440\u0438\u043d\u0433" \u2014 \u0433. \u0410\u0441\u0442\u0430\u043d\u0430',
    '\u0422\u041e\u041e "KGS-Astana" \u2014 \u0433. \u0410\u0441\u0442\u0430\u043d\u0430 (\u043c\u043d\u043e\u0433\u043e\u043a\u0440\u0430\u0442\u043d\u043e)',
    '\u0422\u041e\u041e "\u041c\u0430\u0434\u0438 \u041a\u043e\u043c\u043f\u0430\u043d\u0438\u044f" \u2014 \u0433. \u0410\u0441\u0442\u0430\u043d\u0430 08.11.2004',
    '\u0422\u041e\u041e "\u041a\u0430\u043f\u0438\u0442\u0430\u043b-\u041f\u0412" \u2014 \u0433. \u041f\u0430\u0432\u043b\u043e\u0434\u0430\u0440 16.08.2017',
    '\u0422\u041e\u041e "Global PV" \u2014 \u0433. \u041f\u0430\u0432\u043b\u043e\u0434\u0430\u0440 19.06.2018',
    '\u0422\u041e\u041e "\u041c\u043e\u043d\u0442\u0430\u0436 \u0421\u0442\u0440\u043e\u0439 Company-V" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 19.09.2018',
    '\u0422\u041e\u041e "Pilar Construction" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 24.09.2018',
    '\u0422\u041e\u041e "\u041a\u0430\u043f \u0421\u0442\u0440\u043e\u0439 \u0410\u043b\u043c\u0430\u0442\u044b" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 02.11.2018',
    '\u0422\u041e\u041e "\u0412\u041e\u041b\u0421\u0421\u0422\u0420\u041e\u0419\u0418\u041c\u041f\u041e\u0420\u0422" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 08.01.2019',
    '\u0422\u041e\u041e "U-Con One" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 25.02.2019',
    '\u0422\u041e\u041e "\u0410\u0434\u0438\u043b\u0430\u043d PVC" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 13.03.2019',
    '\u0422\u041e\u041e "\u0410\u043d\u0430 \u0416\u0435\u0440 \u049a\u04b1\u0440\u044b\u043b\u044b\u0441" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b',
    '\u0422\u041e\u041e "\u041f\u0410\u0420\u0410\u0421\u0410\u0422 \u0438 \u041c" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 26.03.2019',
    '\u0422\u041e\u041e "\u0420\u0435\u043c\u0411\u0423\u0421" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 05.04.2019',
    '\u0422\u041e\u041e "WABYT-2014" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 17.06.2019',
    '\u0422\u041e\u041e "\u041c\u0430\u0441\u0442\u0435\u0440-\u0414\u0438\u043d" \u2014 \u0433. \u041d\u0443\u0440-\u0421\u0443\u043b\u0442\u0430\u043d 25.07.2019',
    '\u0422\u041e\u041e "\u0421\u041a \u0421\u0435\u043d\u0456\u043c" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 12.08.2019',
    '\u0422\u041e\u041e "\u0411\u0430\u0439\u043c\u0435\u043d" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 26.08.2019',
    '\u0422\u041e\u041e "Yermensay MD Construction" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 07.11.2019',
    '\u0422\u041e\u041e "\u0421\u0438\u0433\u043c\u0430" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 19.12.2019',
    '\u0422\u041e\u041e "\u0421\u043f\u0435\u0446\u0413\u0440\u0430\u0434\u0421\u0442\u0440\u043e\u0439" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b',
    '\u0422\u041e\u041e "\u0410\u043b\u043c\u0430\u0442\u044b\u0414\u043e\u0440\u0421\u0442\u0440\u043e\u0439" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 25.05.2020',
    '\u0422\u041e\u041e "\u0422\u0423\u0420-\u0425\u0410\u041d" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 05.06.2020',
    '\u0422\u041e\u041e "\u0410\u0437\u0438\u044f\u042d\u043d\u0435\u0440\u0433\u043e\u0410\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u043a\u0430" \u2014 \u0433. \u0422\u0430\u043b\u0434\u044b\u043a\u043e\u0440\u0433\u0430\u043d 11.08.2020',
    '\u0422\u041e\u041e "Samal development" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b',
    '\u0422\u041e\u041e "\u0420\u0435\u0441\u043c\u0438-\u0422\u0430\u0431\u044b\u0441" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b',
    '\u0422\u041e\u041e "\u041c\u043e\u043d\u043e\u043b\u0438\u0442-\u0414\u0438\u0437\u0430\u0439\u043d2030" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 11.12.2020',
    '\u0422\u041e\u041e "\u0421\u041f \u041a\u0430\u0437\u0413\u0435\u0440\u0421\u0442\u0440\u043e\u0439" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 25.12.2020',
    '\u0422\u041e\u041e "\u0421\u041a \u0411\u0430\u0440\u043b\u0430\u0441 \u043a\u0443\u0440\u044b\u043b\u044b\u0441" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b',
    '\u0422\u041e\u041e "VentKarkaraServis" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 20.05.2021',
    '\u0422\u041e\u041e "BAYER Construction" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b',
    '\u0422\u041e\u041e "\u0410\u0433\u0430\u0434\u0435\u043b\u044c-\u0410\u0441" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 04.10.2021',
    '\u0422\u041e\u041e "\u041a\u043e\u043d\u043a\u0440\u0435\u0442" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 07.12.2021',
    '\u0422\u041e\u041e "Essentai House" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 18.01.2022',
    '\u0422\u041e\u041e "KH Construction" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b',
    '\u0422\u041e\u041e "AK Construction" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 30.05.2022',
    '\u0422\u041e\u041e "KH STROY" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b',
    '\u0422\u041e\u041e "\u0413\u0438\u0434\u0440\u043e \u041a\u0443\u0440\u044b\u043b\u044b\u0441" \u2014 \u0433. \u0428\u0430\u0440\u0434\u0430\u0440\u0430 27.08.2022',
    '\u0422\u041e\u041e "KGS-Astana" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 08.09.2022',
    '\u0422\u041e\u041e "Kaztelematica" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 09.09.2022',
    '\u0422\u041e\u041e "\u0422\u0430\u0440\u0430\u0437 \u049a\u04b1\u0440\u044b\u043b\u044b\u0441 \u0418\u043d\u0432\u0435\u0441\u0442" \u2014 \u0416\u0430\u043c\u0431\u044b\u043b\u0441\u043a\u0430\u044f \u043e\u0431\u043b. 05.10.2022',
    '\u0422\u041e\u041e "MAX BET PV2" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 20.12.2022',
    '\u0422\u041e\u041e "Exclusive Stroy System" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 02.02.2023',
    '\u0422\u041e\u041e "Leopard Group" \u2014 \u0410\u043b\u043c\u0430\u0442\u0438\u043d\u0441\u043a\u0430\u044f \u043e\u0431\u043b. 18.05.2023',
    '\u0422\u041e\u041e "Aspan Development" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b',
    '\u0422\u041e\u041e "TANSY Construction" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 27.07.2023',
    '\u0422\u041e\u041e "Big \u0428\u0430\u04a3\u044b\u0440\u0430\u049b" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 10.08.2023',
    '\u0422\u041e\u041e "\u041c\u0411\u0420-\u0422\u0435\u0445\u043d\u043e\u043b\u043e\u0434\u0436\u0438\u0441" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 26.09.2023',
    '\u0422\u041e\u041e "HYUN GROUP CONSTRUCTION" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 26.12.2023',
    '\u0422\u041e\u041e "\u041a\u043e\u043d\u0441\u0442\u0440\u0443\u043a\u0442\u0438\u0432 \u0421\u0442\u0440\u043e\u0439" \u2014 \u0433. \u0410\u043b\u043c\u0430\u0442\u044b 2024',
  ];

  // In-memory cache
  let cache = { content: {}, shared: {} };
  let initialized = false;

  const db = window.firebaseDb;

  function deepMerge(target, source) {
    if (!source) return target;
    const result = { ...target };
    for (const k of Object.keys(source)) {
      if (source[k] && typeof source[k] === 'object' && !Array.isArray(source[k]) && target[k] && typeof target[k] === 'object' && !Array.isArray(target[k])) {
        result[k] = deepMerge(target[k], source[k]);
      } else {
        result[k] = source[k];
      }
    }
    return result;
  }

  window.contentManager = {
    DEFAULT_GALLERY_IMAGES,
    DEFAULT_CERTIFICATES,
    DEFAULT_PROJECTS,

    async init() {
      if (initialized) return;
      if (!db) { initialized = true; return; }
      try {
        // Load all content docs
        const contentSnap = await db.collection('content').get();
        contentSnap.forEach(doc => { cache.content[doc.id] = doc.data(); });
        // Load shared docs
        const sharedSnap = await db.collection('shared').get();
        sharedSnap.forEach(doc => { cache.shared[doc.id] = doc.data(); });
        initialized = true;
      } catch (e) {
        console.warn('Firestore init failed, using defaults:', e);
        initialized = true;
      }
    },

    getContent(lang, defaultData) {
      const overrides = cache.content[lang] || {};
      return defaultData ? deepMerge(defaultData, overrides) : overrides;
    },

    async setContent(lang, sectionKey, data) {
      if (!cache.content[lang]) cache.content[lang] = {};
      cache.content[lang][sectionKey] = data;
      if (db) {
        await db.collection('content').doc(lang).set(cache.content[lang]);
      }
    },

    async setFullLangContent(lang, data) {
      cache.content[lang] = data;
      if (db) {
        await db.collection('content').doc(lang).set(data);
      }
    },

    getShared(key) {
      if (key === 'gallery') {
        const g = cache.shared.gallery;
        return g && g.images ? g : { images: DEFAULT_GALLERY_IMAGES };
      }
      if (key === 'certificates') {
        const c = cache.shared.certificates;
        return c && c.images ? c : { images: DEFAULT_CERTIFICATES };
      }
      if (key === 'projects') {
        const p = cache.shared.projects;
        return (p && Array.isArray(p.items)) ? p.items : DEFAULT_PROJECTS;
      }
      return cache.shared[key];
    },

    async setShared(key, data) {
      cache.shared[key] = data;
      if (db) {
        await db.collection('shared').doc(key).set(typeof data === 'object' && !Array.isArray(data) ? data : { items: data });
      }
    },

    getAllStored() {
      return { content: cache.content, shared: cache.shared };
    },

    exportAll() {
      return JSON.stringify(this.getAllStored(), null, 2);
    },

    async importAll(jsonString) {
      const data = JSON.parse(jsonString);
      if (typeof data !== 'object' || data === null) throw new Error('Invalid data');
      if (data.content) {
        if (typeof data.content !== 'object') throw new Error('Invalid content');
        for (const lang of Object.keys(data.content)) {
          if (!['kk', 'ru', 'en', 'zh', 'tr'].includes(lang)) throw new Error('Invalid lang: ' + lang);
          if (typeof data.content[lang] !== 'object') throw new Error('Invalid lang data');
        }
        cache.content = data.content;
        if (db) {
          for (const lang of Object.keys(data.content)) {
            await db.collection('content').doc(lang).set(data.content[lang]);
          }
        }
      }
      if (data.shared) {
        if (typeof data.shared !== 'object') throw new Error('Invalid shared');
        if (data.shared.gallery) {
          if (!Array.isArray(data.shared.gallery.images)) throw new Error('Invalid gallery');
          data.shared.gallery.images = data.shared.gallery.images.filter(i => typeof i === 'string');
        }
        if (data.shared.projects) {
          if (Array.isArray(data.shared.projects)) {
            data.shared.projects = { items: data.shared.projects.filter(p => typeof p === 'string') };
          }
        }
        cache.shared = data.shared;
        if (db) {
          for (const key of Object.keys(data.shared)) {
            await db.collection('shared').doc(key).set(data.shared[key]);
          }
        }
      }
    },

    async clearAll() {
      cache = { content: {}, shared: {} };
      if (db) {
        const batch = db.batch();
        const contentSnap = await db.collection('content').get();
        contentSnap.forEach(doc => batch.delete(doc.ref));
        const sharedSnap = await db.collection('shared').get();
        sharedSnap.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
      }
    },
  };
})();
