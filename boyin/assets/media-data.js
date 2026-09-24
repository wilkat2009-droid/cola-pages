/* ==========================================================================
   示範影片資料（外部來源，以 iframe 嵌入；全部經查證影片頁真實存在）
   --------------------------------------------------------------------------
   要加減影片，改這個檔案就好，不用碰 media.html。
   每筆欄位：
     title  影片標題
     by     來源標註（平台 · 頻道／機構 · 年份 · 時長）
     embed  嵌入用 URL（bilibili 用 player.bilibili.com；YouTube 用 /embed/）
     page   原頁面 URL
     why    為什麼看它（一句，具體說它示範了什麼）
     status 'ok' = 已查證存在且可播；'check' = 未查證，點開自行判斷
     local  可選。有這個欄位就用本機檔案播放（不用登入、不用連網、沒有彈幕），
            值是一個相對於網站根目錄的 mp4 路徑，例如 'video/BV1S4411L79A.mp4'
   ========================================================================== */

const MEDIA_VIDEOS = [
  {
    group: '口部操與口腔控制',
    items: [
      {
        title: '口部操 · 兒歌跟練版',
        by: '課堂跟練 · 2:17 · 9 節',
        local: 'video/koubu-erge-genlian.mp4',
        portrait: true,
        chapters: [
          { t: 6, name: '大老虎 · 打開牙關' },
          { t: 21, name: '棒棒糖 · 頂舌' },
          { t: 35, name: '小蛇出洞 · 伸舌' },
          { t: 49, name: '環繞地球 · 繞舌' },
          { t: 64, name: '敲木魚兒 · 彈舌找節奏' },
          { t: 78, name: '拍皮球 · 唇部橫向肌肉' },
          { t: 91, name: '騎摩托 · 氣息震動嘴唇' },
          { t: 105, name: '放鞭炮 · 嘴唇內側肌肉' },
          { t: 119, name: '微笑和親親 · 提顴肌與撮口呼' }
        ],
        page: 'video/koubu-erge-genlian.mp4',
        status: 'ok'
      },
      {
        title: '【如何讓聲音變好聽】每天兩分鐘，擁有靈活的舌頭、清晰的口齒｜口部操示範版',
        by: 'bilibili · 胖雪人Ozu · 2019 · 2:41',
        local: 'video/BV1S4411L79A.mp4',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1S4411L79A&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1S4411L79A/',
        status: 'ok'
      },
      {
        title: '【口齒不清怎麼辦】口部操教學版｜口齒清晰，告別「大舌頭」',
        by: 'bilibili · 胖雪人Ozu · 2019 · 8:34 · 91.4 萬播放',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1f4411H74b&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1f4411H74b/',
        status: 'ok'
      },
      {
        title: '【全60集】播音小主持培訓｜P5【口部操】練習唇舌力度幫你做到字音飽滿',
        by: 'bilibili · 小學加油站 · 2024 · 17:04 · 6.7 萬播放',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1KM4m127MH&page=5&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1KM4m127MH/',
        status: 'ok'
      },
      {
        title: '幼兒主持表演 口部操練習《啄木鳥》',
        by: 'bilibili · 小溢老師的戲劇課堂 · 2022 · 0:45',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1wT41177ja&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1wT41177ja/',
        status: 'ok'
      }
    ]
  },
  {
    group: '氣息與呼吸',
    items: [
      {
        title: '【播音乾貨】三步訓練，輕鬆掌握胸腹聯合式呼吸法',
        by: 'bilibili · 播音配音有聲教程 · 2021 · 5:35 · 3.5 萬播放',
        embed: 'https://player.bilibili.com/player.html?bvid=BV19L4y1q72t&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV19L4y1q72t/',
        status: 'ok'
      },
      {
        title: '氣息練習系列——數棗練習學換氣',
        by: 'bilibili · 跟鵬鵬老師學發聲 · 2021 · 6:54 · 2.8 萬播放',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1tt4y1B7yq&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1tt4y1B7yq/',
        status: 'ok'
      }
    ]
  },
  {
    group: '發聲與共鳴',
    items: [
      {
        title: '播音朗誦共鳴訓練，讓聲音變得洪亮、圓潤、渾厚、優美動聽',
        by: 'bilibili · 遍山的紅楓葉 · 2021 · 10:42 · 1.3 萬播放',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1gb4y1b7ox&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1gb4y1b7ox/',
        status: 'ok'
      },
      {
        title: '播音主持 基礎課程 第17講 播音發聲 共鳴控制（一）',
        by: 'YouTube · J Wan · 2017 · 23:42',
        embed: 'https://www.youtube.com/embed/Z5C8BQ9xhmc',
        page: 'https://www.youtube.com/watch?v=Z5C8BQ9xhmc',
        status: 'ok'
      }
    ]
  },
  {
    group: '吐字歸音、平翹舌與繞口令',
    items: [
      {
        title: '播音發聲－吐字歸音',
        by: 'bilibili · 主播文倩（自介為湖北省普通話水平測試員）· 2025 · 11:58 · 4K',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1yrRVY9E5v&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1yrRVY9E5v/',
        status: 'ok'
      },
      {
        title: '【一年級語文】漢語拼音平舌音和翹舌音的區分（動畫＋速記口訣）',
        by: 'bilibili · 愛學百寶箱 · 2024 · 4:25 · 7,680 播放',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1VVDNYMEoX&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1VVDNYMEoX/',
        status: 'ok'
      },
      {
        title: '跟着繞口令學拼音（動畫版，20 集）',
        by: 'bilibili · 圓圓的粑比 · 2022 · 20 集共 68:23 · 1,878 播放',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1HZ4y1v7x2&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1HZ4y1v7x2/',
        status: 'ok'
      }
    ]
  },
  {
    group: '四聲與語音',
    items: [
      {
        title: '最全聲調跟讀練習！讓普通話做到字正腔圓',
        by: 'bilibili · 聲音教練金小鑫 · 2022 · 16:39 · 2.6 萬播放',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1EU4y1B75C&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1EU4y1B75C/',
        status: 'ok'
      },
      {
        title: '播音主持普通話語音（中國傳媒大學精品課）｜4.2.1 普通話的聲調與發音（第二講）',
        by: 'bilibili · 造物者花（中傳慕課搬運）· 2022 · 10:05',
        embed: 'https://player.bilibili.com/player.html?bvid=BV12g411f7Yr&page=12&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV12g411f7Yr/',
        status: 'ok'
      }
    ]
  },
  {
    group: '話筒操',
    items: [
      {
        title: '你的話筒拿對了嗎？一分鐘帶你了解話筒的正確拿法',
        by: 'bilibili · 三賢主持匯 · 2021 · 0:46',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1AY411x7za&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1AY411x7za/',
        status: 'ok'
      },
      {
        title: '跟着央視春晚主持人正確拿話筒！這樣握沉穩又自如',
        by: 'bilibili · 韵仔大王（電視節目主持人）· 2026 · 1:41',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1M7fbB6EwR&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1M7fbB6EwR/',
        status: 'ok'
      }
    ]
  },
  {
    group: '站姿與颱風',
    items: [
      {
        title: '主持人的站姿',
        by: 'bilibili · 主持人孟瑤 · 2022 · 0:52',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1Qi4y1r7Ho&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1Qi4y1r7Ho/',
        status: 'ok'
      },
      {
        title: '形體塑造｜站姿挺拔訓練｜優雅氣質修煉手冊',
        by: 'bilibili · 浙江開放大學（官方帳號）· 2023 · 26:00',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1FG411D77q&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1FG411D77q/',
        status: 'ok'
      }
    ]
  },
  {
    group: '眼神與手勢',
    items: [
      {
        title: '7 年新聞主播的眼神管理法，解救雙眼無神、演講不自信',
        by: 'bilibili · 張慧鑫不灰心（前新聞主播）· 2021 · 6:06 · 89 萬播放',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1Jg411T7AX&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1Jg411T7AX/',
        status: 'ok'
      },
      {
        title: '央視主持人｜眼神練習，五分鐘 get 星星眼',
        by: 'bilibili · Tianyi小刘 · 2024 · 2:05',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1Q4421U7Tk&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1Q4421U7Tk/',
        status: 'ok'
      },
      {
        title: '乾貨－上台肢體尷尬？教你主持人萬能手勢',
        by: 'bilibili · 主持人小史 · 2025 · 2:37',
        embed: 'https://player.bilibili.com/player.html?bvid=BV12qYhzPEai&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV12qYhzPEai/',
        status: 'ok'
      }
    ]
  },
  {
    group: '朗讀、新聞播報與即興',
    items: [
      {
        title: '【中國傳媒大學】普通話語音與播音主持創作基礎（全 58 講）',
        by: 'bilibili · 農夫CC（中傳課程搬運）· 2022',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1Fd4y127W8&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1Fd4y127W8/',
        status: 'ok'
      },
      {
        title: '【零基礎播音配音教程】重音、停連、語氣、節奏',
        by: 'bilibili · 播音配音班長 · 2023 · 4:15',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1kM4y197CT&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1kM4y197CT/',
        status: 'ok'
      },
      {
        title: '【新聞播報】第二節：新聞的播讀技巧',
        by: 'bilibili · 會播音的犀牛君 · 2023 · 16:07',
        embed: 'https://player.bilibili.com/player.html?bvid=BV18F411S7jN&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV18F411S7jN/',
        status: 'ok'
      },
      {
        title: '從零開始學播音：即興口語篇第 1 課——新聞類即興評述',
        by: 'bilibili · 風景殺手 · 2022 · 19:50',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1M34y1B71N&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1M34y1B71N/',
        status: 'ok'
      }
    ]
  },
  {
    group: '嗓音保護',
    items: [
      {
        title: '三步學會用氣說話，保護嗓子',
        by: 'bilibili · 跟鵬鵬老師學發聲 · 2023 · 5:46 · 84.8 萬播放',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1xa4y1G73w&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1xa4y1G73w/',
        status: 'ok'
      },
      {
        title: '教師的科學發聲與嗓音保護',
        by: 'bilibili · 安德瑪- · 2023 · 20:01',
        embed: 'https://player.bilibili.com/player.html?bvid=BV1Ax4y1o7aS&page=1&high_quality=1&danmaku=0',
        page: 'https://www.bilibili.com/video/BV1Ax4y1o7aS/',
        status: 'ok'
      }
    ]
  }
];
