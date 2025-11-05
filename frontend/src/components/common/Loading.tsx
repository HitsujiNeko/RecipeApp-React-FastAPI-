export default function Loading() {
  return (
    <div className="flex justify-center items-center h-64">
			<span className="animate-spin rounded-full border-4 border-orange-400 border-t-transparent w-10 h-10 mr-3"></span>
			<span className="text-orange-500 text-3xl font-bold ml-3">読み込み中...</span>
		</div>
  )
}
