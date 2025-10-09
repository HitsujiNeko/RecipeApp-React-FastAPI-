from sqlmodel import Session, SQLModel, create_engine
from models import Ingredient, Category, Recipe
from database import engine


SQLModel.metadata.create_all(engine)
ingredients_data = [
        {"name": "鶏胸肉", "reading": "とりむねにく", "type": "肉"},
        {"name": "鶏もも肉", "reading": "とりももにく", "type": "肉"},
        {"name": "豚ヒレ肉", "reading": "ぶたひれにく", "type": "肉"},
        {"name": "豚バラ肉", "reading": "ぶたばらにく", "type": "肉"},
        {"name": "豚ロース", "reading": "ぶたろーす", "type": "肉"},
        {"name": "牛肩ロース", "reading": "ぎゅうかたろーす", "type": "肉"},
        {"name": "牛もも肉", "reading": "ぎゅうももにく", "type": "肉"},
        {"name": "牛ひき肉", "reading": "ぎゅうひきにく", "type": "肉"},
        {"name": "合いびき肉", "reading": "あいびきにく", "type": "肉"},
        {"name": "鶏ひき肉", "reading": "とりひきにく", "type": "肉"},
        {"name": "鶏ささみ", "reading": "とりささみ", "type": "肉"},
        {"name": "鶏手羽先", "reading": "とりてばさき", "type": "肉"},
        {"name": "鶏手羽元", "reading": "とりてばもと", "type": "肉"},
        {"name": "鶏レバー", "reading": "とりればー", "type": "肉"},
        {"name": "豚こま切れ肉", "reading": "ぶたこまぎれにく", "type": "肉"},
        {"name": "豚ひき肉", "reading": "ぶたひきにく", "type": "肉"},
        {"name": "牛タン", "reading": "ぎゅうたん", "type": "肉"},
        {"name": "ラム肉", "reading": "らむにく", "type": "肉"},
        {"name": "ベーコン", "reading": "べーこん", "type": "肉"},
        {"name": "ウインナー", "reading": "ういんなー", "type": "肉"},
        {"name": "ハム", "reading": "はむ", "type": "肉"},
        {"name": "サラダチキン", "reading": "さらだちきん", "type": "肉"},
        {"name": "ツナ缶", "reading": "つなかん", "type": "魚"},
        {"name": "鮭", "reading": "さけ", "type": "魚"},
        {"name": "鯖", "reading": "さば", "type": "魚"},
        {"name": "アジ", "reading": "あじ", "type": "魚"},
        {"name": "イワシ", "reading": "いわし", "type": "魚"},
        {"name": "カツオ", "reading": "かつお", "type": "魚"},
        {"name": "ブリ", "reading": "ぶり", "type": "魚"},
        {"name": "サンマ", "reading": "さんま", "type": "魚"},
        {"name": "ホッケ", "reading": "ほっけ", "type": "魚"},
        {"name": "エビ", "reading": "えび", "type": "魚"},
        {"name": "イカ", "reading": "いか", "type": "魚"},
        {"name": "タコ", "reading": "たこ", "type": "魚"},
        {"name": "ホタテ", "reading": "ほたて", "type": "魚"},
        {"name": "しらす", "reading": "しらす", "type": "魚"},
        {"name": "アサリ", "reading": "あさり", "type": "魚"},
        {"name": "カニカマ", "reading": "かにかま", "type": "魚"},
        {"name": "絹豆腐", "reading": "きぬどうふ", "type": "大豆"},
        {"name": "木綿豆腐", "reading": "もめんどうふ", "type": "大豆"},
        {"name": "厚揚げ", "reading": "あつあげ", "type": "大豆"},
        {"name": "油揚げ", "reading": "あぶらあげ", "type": "大豆"},
        {"name": "納豆", "reading": "なっとう", "type": "大豆"},
        {"name": "おから", "reading": "おから", "type": "大豆"},
        {"name": "高野豆腐", "reading": "こうやどうふ", "type": "大豆"},
        {"name": "枝豆", "reading": "えだまめ", "type": "大豆"},
        {"name": "大豆水煮", "reading": "だいずみずに", "type": "大豆"},
        {"name": "レタス", "reading": "れたす", "type": "野菜"},
        {"name": "キャベツ", "reading": "きゃべつ", "type": "野菜"},
        {"name": "白菜", "reading": "はくさい", "type": "野菜"},
        {"name": "小松菜", "reading": "こまつな", "type": "野菜"},
        {"name": "ほうれん草", "reading": "ほうれんそう", "type": "野菜"},
        {"name": "水菜", "reading": "みずな", "type": "野菜"},
        {"name": "大根", "reading": "だいこん", "type": "野菜"},
        {"name": "人参", "reading": "にんじん", "type": "野菜"},
        {"name": "玉ねぎ", "reading": "たまねぎ", "type": "野菜"},
        {"name": "長ねぎ", "reading": "ながねぎ", "type": "野菜"},
        {"name": "じゃがいも", "reading": "じゃがいも", "type": "野菜"},
        {"name": "さつまいも", "reading": "さつまいも", "type": "野菜"},
        {"name": "里芋", "reading": "さといも", "type": "野菜"},
        {"name": "ごぼう", "reading": "ごぼう", "type": "野菜"},
        {"name": "れんこん", "reading": "れんこん", "type": "野菜"},
        {"name": "かぼちゃ", "reading": "かぼちゃ", "type": "野菜"},
        {"name": "ピーマン", "reading": "ぴーまん", "type": "野菜"},
        {"name": "パプリカ", "reading": "ぱぷりか", "type": "野菜"},
        {"name": "ししとう", "reading": "ししとう", "type": "野菜"},
        {"name": "なす", "reading": "なす", "type": "野菜"},
        {"name": "トマト", "reading": "とまと", "type": "野菜"},
        {"name": "ミニトマト", "reading": "みにとまと", "type": "野菜"},
        {"name": "きゅうり", "reading": "きゅうり", "type": "野菜"},
        {"name": "ズッキーニ", "reading": "ずっきーに", "type": "野菜"},
        {"name": "オクラ", "reading": "おくら", "type": "野菜"},
        {"name": "アスパラガス", "reading": "あすぱらがす", "type": "野菜"},
        {"name": "ブロッコリー", "reading": "ぶろっこりー", "type": "野菜"},
        {"name": "カリフラワー", "reading": "かりふらわー", "type": "野菜"},
        {"name": "スナップえんどう", "reading": "すなっぷえんどう", "type": "野菜"},
        {"name": "インゲン", "reading": "いんげん", "type": "野菜"},
        {"name": "もやし", "reading": "もやし", "type": "野菜"},
        {"name": "豆苗", "reading": "とうみょう", "type": "野菜"},
        {"name": "カイワレ大根", "reading": "かいわれだいこん", "type": "野菜"},
        {"name": "セロリ", "reading": "せろり", "type": "野菜"},
        {"name": "みょうが", "reading": "みょうが", "type": "野菜"},
        {"name": "大葉", "reading": "おおば", "type": "野菜"},
        {"name": "にら", "reading": "にら", "type": "野菜"},
        {"name": "にんにく", "reading": "にんにく", "type": "野菜"},
        {"name": "しょうが", "reading": "しょうが", "type": "野菜"},
        {"name": "コーン", "reading": "こーん", "type": "野菜"},
        {"name": "グリーンピース", "reading": "ぐりーんぴーす", "type": "野菜"},
        {"name": "まいたけ", "reading": "まいたけ", "type": "きのこ"},
        {"name": "しめじ", "reading": "しめじ", "type": "きのこ"},
        {"name": "えのき", "reading": "えのき", "type": "きのこ"},
        {"name": "しいたけ", "reading": "しいたけ", "type": "きのこ"},
        {"name": "マッシュルーム", "reading": "まっしゅるーむ", "type": "きのこ"},
        {"name": "エリンギ", "reading": "えりんぎ", "type": "きのこ"},
        {"name": "卵", "reading": "たまご", "type": "卵"},
        {"name": "うずら卵", "reading": "うずらたまご", "type": "卵"},
        {"name": "パスタ", "reading": "ぱすた", "type": "炭水化物"},
        {"name": "うどん", "reading": "うどん", "type": "炭水化物"},
        {"name": "そば", "reading": "そば", "type": "炭水化物"},
        {"name": "そうめん", "reading": "そうめん", "type": "炭水化物"},
        {"name": "中華麺", "reading": "ちゅうかめん", "type": "炭水化物"},
        {"name": "ご飯", "reading": "ごはん", "type": "炭水化物"},
        {"name": "米", "reading": "こめ", "type": "炭水化物"},
        {"name": "もち米", "reading": "もちごめ", "type": "炭水化物"},
        {"name": "パン", "reading": "ぱん", "type": "炭水化物"},
        {"name": "食パン", "reading": "しょくぱん", "type": "炭水化物"},
        {"name": "ピザ生地", "reading": "ぴざきじ", "type": "炭水化物"},
        {"name": "お餅", "reading": "おもち", "type": "炭水化物"},
        {"name": "春雨", "reading": "はるさめ", "type": "炭水化物"},
]


def create_ingredients():
    with Session(engine) as session:
        for ingredient in ingredients_data:
            db_ingredient = Ingredient(**ingredient)
            session.add(db_ingredient)
        session.commit()


category_data = [
    {"name": "主菜"},
    {"name": "副菜"},
    {"name": "炭水化物"},
    {"name": "スープ"},
    {"name": "お菓子"},
]

def create_categories():
    with Session(engine) as session:
        for category in category_data:
            db_category = Category(**category)
            session.add(db_category)
        session.commit()

if __name__ == "__main__":
    create_ingredients()
    create_categories()

