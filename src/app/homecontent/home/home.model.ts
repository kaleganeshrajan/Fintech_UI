export class HomeModel {
	private optionId: String;
	private optionName: String;
	private optionIcon: String;
	private loggedBy: String;
	private launchPage: String;
	private IsBlockMenu: String;
	private MenuIndex: object;
	constructor(
		$optionId: String,
		$optionName: String,
		$optionIcon: String,
		$loggedBy: String,
		$launchPage: String,
		$IsBlockMenu: String,
		$MenuIndex: object
	) {
		this.optionId = $optionId;
		this.optionName = $optionName;
		this.optionIcon = $optionIcon;
		this.loggedBy = $loggedBy;
		this.launchPage = $launchPage;
		this.IsBlockMenu = $IsBlockMenu;
		this.MenuIndex = $MenuIndex;
	}
}
