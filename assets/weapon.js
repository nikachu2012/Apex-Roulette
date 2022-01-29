// version
var apex = {};
var change = {};
var weapon = {};
apex.version = "1.0";


// onload
window.onload = function () {
    weapon.length = 28;
    weapon.picture = `
        <img src="image/ar/r301.png">
        <img src="image/ar/furatora.png">
        <img src="image/ar/habokku.png">
        <img src="image/ar/hemurokku.png">

        <img src="image/smg/puraura-.png">
        <img src="image/smg/boruto.png">
        <img src="image/smg/car.png">
        <img src="image/smg/r99.png">
        <img src="image/smg/orutane-ta-.png">

        <img src="image/lmg/Lstar.png">
        <img src="image/lmg/supitto-faia-.png">
        <img src="image/lmg/deliulo-syon.png">
        <img src="image/lmg/ranpe-ji.png">

        <img src="image/sr/charge.png">
        <img src="image/sr/rongubou.png">
        <img src="image/sr/kure-ba-.png">
        <img src="image/sr/sentineru.png">

        <img src="image/sg/pi-suki-pa-.png">
        <img src="image/sg/masutelifu.png">
        <img src="image/sg/eva-8.png">
        <img src="image/sg/mozan.png">

        <img src="image/marksman/triple-take.png">
        <img src="image/marksman/g7.png">
        <img src="image/marksman/3030repeater.png">
        <img src="image/marksman/bosekku.png">
        
        <img src="image/pistol/p2020.png">
        <img src="image/pistol/ulinguman.png">
        <img src="image/pistol/re45.png">
    `
    weapon.choufuku = 0;

    apex.RouletteSettingReset();

    rouletteStartButton = document.getElementById('startButton')
    setting_col = document.getElementById('setting_col')
    roulette_col = document.getElementById('roulette_col');

    WeaponChoufuku = document.getElementById('WeaponChoufuku')

    we_ar_r301 = document.getElementById('we_ar_r301')
    we_ar_furatora = document.getElementById('we_ar_furatora')
    we_ar_habokku = document.getElementById('we_ar_habokku')
    we_ar_hemurokku = document.getElementById('we_ar_hemurokku')

    we_smg_purauraa = document.getElementById('we_smg_puraura-')
    we_smg_boruto = document.getElementById('we_smg_boruto')
    we_smg_car = document.getElementById('we_smg_car')
    we_smg_r99 = document.getElementById('we_smg_r99')
    we_smg_orutaneetaa = document.getElementById('we_smg_orutane-ta-')

    we_lmg_Lstar = document.getElementById('we_lmg_Lstar')
    we_lmg_supittofaiaa = document.getElementById('we_lmg_supitto-faia-')
    we_lmg_deliuloosyon = document.getElementById('we_lmg_deliulo-syon')
    we_lmg_ranpeeji = document.getElementById('we_lmg_ranpe-ji')

    we_sr_charge = document.getElementById('we_sr_charge')
    we_sr_rongubou = document.getElementById('we_sr_rongubou')
    we_sr_kureebaa = document.getElementById('we_sr_kure-ba-')
    we_sr_sentineru = document.getElementById('we_sr_sentineru')

    we_sg_piisukiipaa = document.getElementById('we_sg_pi-suki-pa-')
    we_sg_masutelifu = document.getElementById('we_sg_masutelifu')
    we_sg_eva8 = document.getElementById('we_sg_eva-8')
    we_sg_mozan = document.getElementById('we_sg_mozan')

    we_marksman_tripletake = document.getElementById('we_marksman_triple-take')
    we_marksman_g7 = document.getElementById('we_marksman_g7')
    we_marksman_3030repeater = document.getElementById('we_marksman_3030repeater')
    we_marksman_bosekku = document.getElementById('we_marksman_bosekku')

    we_pistol_p2020 = document.getElementById('we_pistol_p2020')
    we_pistol_ulinguman = document.getElementById('we_pistol_ulinguman')
    we_pistol_re45 = document.getElementById('we_pistol_re45')


    apex.singleRouletteWrite();
};


// 1このルーレット定義
apex.singleRouletteWrite = function () {
    roulette_col.innerHTML = '<div class="border roulette_container roulette_1" style="display:none;">' + weapon.picture + '</div>'
}

// 2このルーレット定義
apex.doubleRouletteWrite = function () {
    roulette_col.innerHTML = '<div class="border roulette_container roulette_1" style="display:none;">' + weapon.picture + '</div><br><div class="border roulette_container roulette_2" style="display:none;">' + weapon.picture + '</div>'
}


//　ルーレット押されたとき

apex.pushRoulette = function () {
    //　１個
    apex.singleRouletteWrite();
    setting_col.innerHTML = `
        <button type="button" class="btn btn-secondary btn-lg" onclick="stopSingleRoulette">ルーレットを止める</button><br><br>
        <button type="button" class="btn btn-secondary btn-lg" onclick="apex.RouletteSettingReset();">もう一度ルーレットを回す</button><br><br>
    `;

    var randomWeapon = Math.floor(Math.random() * weapon.length);
    console.log(randomWeapon);

    var option = {
        speed: 20,
        duration: 1,
        stopImageNumber: randomWeapon
    }
    $('div.roulette_1').roulette(option);

    $('div.roulette_1').roulette('start');
}

apex.pushSubRoulette = function () {
    // ２個
    if (WeaponChoufuku.checked) { weapon.choufuku = 1; }
    else { }

    randomWeapon1 = Math.floor(Math.random() * weapon.length);
    randomWeapon2 = Math.floor(Math.random() * weapon.length);

    console.log('抽選結果:' + randomWeapon1 + ', ' + randomWeapon2)
    apex.saichuusen();

    apex.doubleRouletteWrite();
    setting_col.innerHTML = `
        <button type="button" class="btn btn-secondary btn-lg" onclick="apex.stopDoubleRoulette();">ルーレットを止める</button><br><br>
        <button type="button" class="btn btn-secondary btn-lg" onclick="apex.RouletteSettingReset();">もう一度ルーレットを回す</button><br><br>
    `;

    var option1 = {
        speed: 20,
        duration: 10,
        stopImageNumber: randomWeapon1
    }
    $('div.roulette_1').roulette(option1);

    var option2 = {
        speed: 20,
        duration: 10,
        stopImageNumber: randomWeapon2
    }
    $('div.roulette_2').roulette(option2);

    $('div.roulette_1').roulette('start');
    $('div.roulette_2').roulette('start');
}

apex.saichuusen = function () {
    if (!weapon.choufuku == 1) {
        if (randomWeapon1 == randomWeapon2) {
            randomWeapon1 = Math.floor(Math.random() * weapon.length);
            randomWeapon2 = Math.floor(Math.random() * weapon.length);
            console.log('再抽選:' + randomWeapon1 + ', ' + randomWeapon2)
        }
    }
}

// ルーレット停止
apex.stopSingleRoulette = function () {
    console.log('pushed')
    $('div.roulette_1').roulette('stop');
};

apex.stopDoubleRoulette = function () {
    console.log('pushed')
    $('div.roulette_1').roulette('stop');
    $('div.roulette_2').roulette('stop');
};

apex.setting_col = `
    <h5>ルーレット設定</h5>

    <input class="form-check-input" type="checkbox" id="subWeaponRoulette"></br>

    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#WeaponONOFFmodal">出す武器の設定</button>    
    <br><br>

    <input class="form-check-input" type="checkbox" id="WeaponChoufuku">
    <label class="form-check-label" for="WeaponChoufuku">武器の重複を許可</label><br><br>

    <br>
    <button type="button" class="btn btn-primary btn-lg processRoulette" onclick="apex.pushRoulette();" style="width: 300px"><span class="material-icons">check</span>&nbsp;ルーレット実行！</button><br><br>
    <button type="button" class="btn btn-primary btn-lg processRoulette" onclick="apex.pushSubRoulette();" style="width: 300px"><span class="material-icons">check</span>&nbsp;サブ武器も一緒にルーレット実行！</button>
`

apex.RouletteSettingReset = function () {
    roulette_col.innerHTML = ''
    setting_col.innerHTML = apex.setting_col;
}

//closemodal

function saveModal() {
    weapon.picture = '';
    weapon.length = 0;

    if (we_ar_r301.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/ar/r301.png">'; }
    if (we_ar_furatora.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/ar/furatora.png">'; }
    if (we_ar_habokku.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/ar/habokku.png">'; }
    if (we_ar_hemurokku.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/ar/hemurokku.png">'; }

    if (we_smg_purauraa.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/smg/puraura-.png">'; }
    if (we_smg_boruto.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/smg/boruto.png">'; }
    if (we_smg_car.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/smg/car.png">'; }
    if (we_smg_r99.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/smg/r99.png">'; }
    if (we_smg_orutaneetaa.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/smg/orutane-ta-.png">'; }

    if (we_lmg_Lstar.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/lmg/Lstar.png">'; }
    if (we_lmg_supittofaiaa.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/lmg/supitto-faia-.png">'; }
    if (we_lmg_deliuloosyon.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/lmg/deliulo-syon.png">'; }
    if (we_lmg_ranpeeji.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/lmg/ranpe-ji.png">'; }

    if (we_sr_charge.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/sr/charge.png">'; }
    if (we_sr_rongubou.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/sr/rongubou.png">'; }
    if (we_sr_kureebaa.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/sr/kure-ba-.png">'; }
    if (we_sr_sentineru.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/sr/sentineru.png">'; }

    if (we_sg_piisukiipaa.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/sg/pi-suki-pa-.png">'; }
    if (we_sg_masutelifu.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/sg/masutelifu.png">'; }
    if (we_sg_eva8.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/sg/eva-8.png">'; }
    if (we_sg_mozan.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/sg/mozan.png">'; }

    if (we_marksman_tripletake.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/marksman/triple-take.png">'; }
    if (we_marksman_g7.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/marksman/g7.png">'; }
    if (we_marksman_3030repeater.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/marksman/3030repeater.png">'; }
    if (we_marksman_bosekku.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/marksman/bosekku.png">'; }

    if (we_pistol_p2020.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/pistol/p2020.png">'; }
    if (we_pistol_ulinguman.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/pistol/ulinguman.png">'; }
    if (we_pistol_re45.checked) { weapon.length = weapon.length + 1; weapon.picture = weapon.picture + '<img src="image/pistol/re45.png">'; }

    if (weapon.length < 2) {
        alert('少なくとも２個以上は指定してください。')
    }
    else {
        $('#WeaponONOFFmodal').modal('hide') //モーダルとじる
    }



}