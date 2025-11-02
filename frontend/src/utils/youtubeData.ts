import { IngredientModel, YouTubeChannelModel, RecipeCreateRequest } from "../types/models";
import { fetchYoutubeVideo } from "../api/api";

/**
 * YouTube動画情報を取得し、フォーム初期値やチャンネル情報をセットするためのユーティリティ関数。
 * - プレイリストURLの場合はエラーを返す
 * - 動画情報取得失敗時はエラーを返す
 * - 成功時はフォーム初期値・チャンネル情報を返す
 */
export async function fetchAndParseYoutubeData(
  url: string,
  ingredients: IngredientModel[]
): Promise<
  | {
      initialValues: Partial<RecipeCreateRequest>;
      channelData: YouTubeChannelModel | null;
      error: string | null;
    }
  | { error: string; initialValues?: undefined; channelData?: undefined }
> {
  if (!url || ingredients.length === 0) {
    return { error: "URLまたは食材リストが未設定です" };
  }
  if (url.includes("list=")) {
    return { error: "プレイリストのURLが入力されています。プレイリストは一括追加ページから登録してください" };
  }
  try {
    const data = await fetchYoutubeVideo(url);
    if (data.error) {
      return { error: "動画が見つかりません。URLを確認してください" };
    }
    if (data && data.description) {
      const desc = data.description as string;
      // 説明文から食材ID抽出
      const ids: number[] = [];
      for (const ing of ingredients) {
        const re = new RegExp(ing.name + "|" + ing.reading, "g");
        if (desc && re.test(desc)) ids.push(ing.id);
      }
      // チャンネルデータ設定
      let channelObj: YouTubeChannelModel | null = null;
      let channelId: number | null = null;
      if (data.channelId && data.channelTitle && data.channelIcon) {
        channelObj = {
          id: data.dbChannelId || 0,
          name: data.channelTitle,
          url: `https://www.youtube.com/channel/${data.channelId}`,
          thumbnail: data.channelIcon,
        };
        channelId = data.dbChannelId || null;
      }
      return {
        initialValues: {
          name: data.title || "",
          ingredient_ids: ids,
          youtube_channel_id: channelId,
          thumbnail: data.thumbnail || "",
          url: url,
        },
        channelData: channelObj,
        error: null,
      };
    }
    return { error: "動画情報の取得に失敗しました" };
  } catch (e) {
    return { error: "YouTube説明文の取得に失敗しました" };
  }
}
