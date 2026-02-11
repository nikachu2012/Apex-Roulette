// character roulette (weapon.js を参考にした実装)
var apex = apex || {};
var character = {};
apex.version = apex.version || "1.0";

window.onload = window.onload || function () {};

// 初期化をページロード時に行う（weapon.js と干渉しないように遅延登録）
document.addEventListener('DOMContentLoaded', function () {
    // 添付画像にあるキャラクター全員を初期登録（ファイル名は image/character/ 以下に配置）
    character.length = 27;
    character.picture = `
        <img src="image/character/アッシュ.jpg">
        <img src="image/character/ヴァルキリー.jpg">
        <img src="image/character/ヴァンテージ.jpg">
        <img src="image/character/オクタン.jpg">
        <img src="image/character/オルター.jpg">
        <img src="image/character/カタリスト.jpg">
        <img src="image/character/クリプト.jpg">
        <img src="image/character/コースティック.jpg">
        <img src="image/character/コンジット.jpg">
        <img src="image/character/シア.jpg">
        <img src="image/character/ジブラルタル.jpg">
        <img src="image/character/スパロー.jpg">
        <img src="image/character/ニューキャッスル.jpg">
        <img src="image/character/パスファインダー.jpg">
        <img src="image/character/バリスティック.jpg">
        <img src="image/character/バンガロール.jpg">
        <img src="image/character/ヒューズ.jpg">
        <img src="image/character/ブラッドハウンド.jpg">
        <img src="image/character/ホライゾン.jpg">
        <img src="image/character/マッドマギー.jpg">
        <img src="image/character/ミラージュ.jpg">
        <img src="image/character/ライフライン.jpg">
        <img src="image/character/ランパート.jpg">
        <img src="image/character/レイス.jpg">
        <img src="image/character/レヴナント.jpg">
        <img src="image/character/ローバ.jpg">
        <img src="image/character/ワットソン.jpg">
    `;
    character.choufuku = 0;

    apex.RouletteSettingReset = apex.RouletteSettingReset || function () {};

    // 初期表示
    if (typeof apex.RouletteSettingReset === 'function') apex.RouletteSettingReset();

    // 参照要素
    roulette_col = document.getElementById('roulette_col');
    setting_col = document.getElementById('setting_col');

    // チェックボックス要素は saveCharacterModal で参照します

    apex.singleCharacterRouletteWrite = function () {
        roulette_col.innerHTML = '<div class="border roulette_container roulette_1" style="display:none; width: 500px; height: 300px;">' + character.picture + '</div>';
    }

    // 指定数のルーレットコンテナを作る（1..n）
    apex.multiCharacterRouletteWrite = function (n) {
        var html = '';
        for (var i = 1; i <= n; i++) {
            html += '<div class="border roulette_container roulette_' + i + '" style="display:none; width: 500px; height: 300px; margin-bottom:8px;">' + character.picture + '</div>';
        }
        roulette_col.innerHTML = html;
    }

    apex.pushCharacterRoulette = function () {
        apex.singleCharacterRouletteWrite();
        setting_col.innerHTML = `
            <button type="button" class="btn btn-secondary btn-lg" onclick="apex.stopSingleCharacterRoulette();">ルーレットを止める</button><br><br>
            <button type="button" class="btn btn-secondary btn-lg" onclick="apex.RouletteSettingReset();">もう一度ルーレットを回す</button><br><br>
        `;

        var randomIndex = Math.floor(Math.random() * character.length);
        var option = { speed: 20, duration: 1, stopImageNumber: randomIndex };
        $('div.roulette_1').roulette(option);
        $('div.roulette_1').roulette('start');
    }

    // 複数（パーティ）ルーレットを開始する。選ばれるキャラは重複しないようにする
    apex.pushCharacterPartyRoulette = function () {
        var partySizeEl = document.getElementById('CharacterPartySize');
        var n = 3; // デフォルト3
        if (partySizeEl) { n = parseInt(partySizeEl.value) || 3; }

        if (n < 1) return;
        if (n > character.length) { alert('パーティ人数が選択可能なキャラ数を超えています。'); return; }

        // 生成するコンテナ
        apex.multiCharacterRouletteWrite(n);

        setting_col.innerHTML = `
            <button type="button" class="btn btn-secondary btn-lg" onclick="apex.stopPartyRoulette();">ルーレットを止める</button><br><br>
            <button type="button" class="btn btn-secondary btn-lg" onclick="apex.RouletteSettingReset();">もう一度ルーレットを回す</button><br><br>
        `;

        // ランダムに重複しないインデックスを n 個選ぶ
        var indices = [];
        for (var i = 0; i < character.length; i++) indices.push(i);
        // シャッフル
        for (var i = indices.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = indices[i]; indices[i] = indices[j]; indices[j] = tmp;
        }
        var picks = indices.slice(0, n);

        // 各ルーレットに設定して開始
        for (var i = 0; i < n; i++) {
            var option = { speed: 20, duration: 1 + i, stopImageNumber: picks[i] };
            $('div.roulette_' + (i + 1)).roulette(option);
            $('div.roulette_' + (i + 1)).roulette('start');
        }
    }

    apex.stopSingleCharacterRoulette = function () { $('div.roulette_1').roulette('stop'); };
    apex.stopDoubleCharacterRoulette = function () { $('div.roulette_1').roulette('stop'); $('div.roulette_2').roulette('stop'); };
    apex.stopPartyRoulette = function () {
        // 停止可能な全ての roulette_* を止める
        var els = document.querySelectorAll('div[class*=\"roulette_\"]');
        for (var i = 0; i < els.length; i++) {
            try { $(els[i]).roulette('stop'); } catch (e) { }
        }
    };

    apex.setting_col = `
        <h5>キャラクタールーレット設定</h5>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#CharacterONOFFmodal">出すキャラクターの設定</button><br><br>

        <div class="form-group">
            <label for="CharacterPartySize">パーティ人数</label>
            <select id="CharacterPartySize" class="form-control" style="width:120px;">
                <option value="2">2</option>
                <option value="3" selected>3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>
        </div>

        <input class="form-check-input" type="checkbox" id="CharacterChoufuku">
        <label class="form-check-label" for="CharacterChoufuku">（個別実行時のみ）キャラの重複を許可</label><br><br>

        <button type="button" class="btn btn-primary btn-lg processRoulette" onclick="apex.pushCharacterRoulette();" style="width: 300px"><span class="material-icons">check</span>&nbsp;１人ルーレット実行！</button><br><br>
        <button type="button" class="btn btn-primary btn-lg processRoulette" onclick="apex.pushCharacterPartyRoulette();" style="width: 300px"><span class="material-icons">check</span>&nbsp;パーティも一緒にルーレット実行！</button>
    `;

    apex.RouletteSettingReset = function () {
        roulette_col.innerHTML = '';
        setting_col.innerHTML = apex.setting_col;
    }

    // save modal の処理（モーダル内のチェックボックスから画像リストを生成）
    window.saveCharacterModal = function () {
        character.picture = '';
        character.length = 0;

        var ids = ['ch_ash','ch_valkyrie','ch_vantage','ch_octane','ch_olter','ch_catalyst','ch_crypto','ch_caustic','ch_conduit','ch_sia','ch_gibraltar','ch_sparrow','ch_newcastle','ch_pathfinder','ch_ballistic','ch_bangalore','ch_fuse','ch_bloodhound','ch_horizon','ch_madmaggie','ch_mirage','ch_lifeline','ch_rampart','ch_wraith','ch_revenant','ch_loba','ch_wattson'];
        var filenames = ['アッシュ.jpg','ヴァルキリー.jpg','ヴァンテージ.jpg','オクタン.jpg','オルター.jpg','カタリスト.jpg','クリプト.jpg','コースティック.jpg','コンジット.jpg','シア.jpg','ジブラルタル.jpg','スパロー.jpg','ニューキャッスル.jpg','パスファインダー.jpg','バリスティック.jpg','バンガロール.jpg','ヒューズ.jpg','ブラッドハウンド.jpg','ホライゾン.jpg','マッドマギー.jpg','ミラージュ.jpg','ライフライン.jpg','ランパート.jpg','レイス.jpg','レヴナント.jpg','ローバ.jpg','ワットソン.jpg'];

        for (var i = 0; i < ids.length; i++) {
            var el = document.getElementById(ids[i]);
            if (el && el.checked) {
                character.length += 1;
                character.picture += '<img src="image/character/' + filenames[i] + '">';
            }
        }

        if (character.length < 1) {
            alert('少なくとも1人は選択してください。');
            return;
        }

        $('#CharacterONOFFmodal').modal('hide');
        apex.RouletteSettingReset();
    }

    // 初期表示
    apex.RouletteSettingReset();
});
