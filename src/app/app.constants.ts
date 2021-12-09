import { Injectable } from '@angular/core';

@Injectable()
export class AppConstants {
	globalCartCount = 0;
	notificationUnreadCount = 0;
	dateFormat = 'dd-MMM-yyyy';
	expiray: String = 'Expiry';
	nonMoving: String = 'Non-Moving';
	breakage: String = 'Breakage';
	paid: String = 'Paid';
	unPaid: String = 'Unpaid';
	totalSale: String = 'Total Sale';
	totalPurchase: String = 'Total Purchase';
	divisionWiseSale: String = 'Division Wise Sale';
	divisionWisePurchase: String = 'Division Wise Purchase';
	highSale: String = 'High Sale';
	highPurchase: String = 'High Purchase';
	lowSale: String = 'Low Sale';
	lowPurchase: String = 'Low Purchase';
	saleAnalytics: String = 'Sale Analytics';
	cityWiseHeatMap: String = 'City Wise HeatMap';
	paymentCollectionsChart: String = 'Payment Collected Chart';
	paymentCollectionsChartDist: String = 'Payment  Chart';
	purchaseAnalytics: String = 'Purchase Analytics';
	newOrder: String = 'New Order';
	selectStockiest: String = 'Select Distributor';
	selectDivision: String = 'Select Division';
	selectDivisionErrMsg: String = 'Please select a division.';
	selectCNF: String = 'Select CFA';
	selectReturnReason: String = 'Select Return Reason';
	add: String = 'ADD';
	addMore: String = 'ADD MORE';
	cartSubtotal: String = 'Cart Subtotal';
	packageType: String = 'Type';
	qty: String = 'Qty';
	offerAmt: String = 'Offer Amount';
	finalAmt: String = 'Grand Total';
	placeOrder: String = 'Place Order';
	offlineOrder: String = 'Offline Orders';
	contactUs: String = 'Contact Us';
	myOrders: String = 'My Orders';
	creditNote: String = 'Credit Note';
	sort: String = 'Sort';
	filter: String = 'Filter';
	orderNo: String = 'Order No';
	creditNoteId: String = 'Credit Note Id';
	distributor: String = 'Distributor';
	distributorDetails: String = 'Distributor Details';
	distributorUser: String = 'Distributor User';
	divisionWiseData: String = 'Division Wise Data';
	cfa: String = 'CFA';
	cfaUser: String = 'CFA User';
	orderBy: String = 'Order by';
	orderDate: String = 'Order Date';
	companyOrderNo: String = 'Company Order No';
	creditNoteDate: String = 'Credit Note Date';
	orderItems: String = 'Order Items';
	orderValue: String = 'Order Value';
	invoiceDetails: String = 'Invoice Details';
	viewInvoices: String = 'View Invoices';
	invoiceNo = 'Invoice No';
	invoiceDate: String = 'Invoice Date';
	lrDate: String = 'LR Date';
	lrNumber: String = 'LR Number';
	totalItems: String = 'Total Items';
	totalFreeItems: String = 'Total Free Items';
	freeItems: String = 'Free Items';
	invoiceValue: String = 'Invoice Value';
	orderAmt: String = 'Order Amount';
	creditNoteAmount: String = 'Credit Note Amount';
	totalOrders: String = 'Total Orders';
	totalNotes: String = 'Total Notes';
	totalCreditNotes: String = 'Total Credit Notes';
	approveOrders: String = 'Pending Order Approval';
	pendingApproveOrders: String = 'Pending Order Approval';
	outstanding: String = 'Outstanding';
	overdueAmount: String = 'Overdue Amount';
	outstandingAmount: String = 'Outstanding Amount';
	dueDate: String = 'Due Date';
	exceedingLimitAmount: String = 'Exceeding Limit Amount';
	currentOrder: String = 'Current Order Value';
	reject: String = 'Reject';
	approve: String = 'Approve';
	avgRepayment: String = 'Avg. Repayment';
	lastPaymentDue: String = 'Last Payment Due';
	myInvoices: String = 'My Invoices';
	productOffers: String = 'Product Offers';
	newProducts: String = 'New Products order';
	approveorders: String = 'Approve Orders';
	earlyExpiryProducts: String = 'Short Expiry Products';
	monthly: String = 'Monthly';
	quaterly: String = 'Quarterly';
	yearly: String = 'Yearly';
	dashboard: String = 'Dashboard';
	order: String = 'Order';
	uploadOrder: String = 'Upload Order';
	schemes: String = 'Bonus Offers';
	scheme: String = 'Bonus Offers';
	addNewUser: String = 'Add New';
	editUser: String = 'Edit';
	saveAndAuth: String = 'Save And Authorize';
	updateAndAuth: String = 'Update And Authorize';
	saveNow: String = 'Save Now';
	updateNow: String = 'Update Now';
	tourPlan: String = 'Tour Plan';
	createdDate: String = 'Created Date';
	todays: String = 'Todays';
	months: String = 'Months';
	myNotes: String = 'My Notes';
	tourPlanDetails: String = 'Tour Plan Details';
	date: String = 'Date';
	contact: String = 'Contact';
	addNewNote: String = 'Add New Note';
	title: String = 'Title';
	description: String = 'Description';
	submit: String = 'Submit';
	done: String = 'Done';
	offer: String = 'Offer';
	users: String = 'Users';
	campaignManager: String = 'Campaign Manager';
	createTour: String = 'Create Tour';
	editTour: String = 'Edit Tour';
	approveTour: String = 'Approve Tour';
	downloadFile: String = 'Download File';
	assignRole: String = 'Assign Roles';
	assignPermissions: String = 'Assign Permissions';
	createCompany: String = 'Create Company';
	mr: String = 'MR User';
	companyUsers: String = 'Company User';
	operationUser: String = "Operation User";
	cfaCode: String = 'CFA Code';
	register: String = 'Registered (On Portal)';
	distributorCode: String = 'Distributor Code';
	divisionCode: String = 'Division Code';
	distributorName: String = 'Distributor Name';
	distributorRegion: String = 'Distributor Region';
	distributorAddress: String = 'Distributor Address';
	distributorOfPharmarack: String = 'Distributor Of Company';
	cstNumber: String = 'CST Number';
	gstNumber: String = 'GST Number';
	licenseNumber: String = 'License Number';
	action: String = 'Action';
	changePassword: String = 'Change Password';
	edit: String = 'Edit';
	authorize: String = 'Authorized';
	nonAuthorize: String = 'Unauthorized';
	active: String = 'Active';
	inActive: String = 'Inactive';
	mapCfa: String = 'Map CFA';
	managePassword: String = 'Manage Password';
	addDistributor: String = 'Add Distributor';
	editDistributor: String = 'Edit Distributor';
	save: String = 'Save';
	scheduleNotification: String = 'Schedule Notification';
	delete: String = 'Delete';
	update: String = 'Update';
	cfaName: String = 'CFA Name';
	cfaRegion: String = 'CFA Region';
	addCfa: String = 'Add CFA';
	editCfa: String = 'Edit CFA';
	name: String = 'Name';
	none: String = 'None';
	region: String = 'Region';
	addRegion: String = 'Add Region';
	editRegion: String = 'Edit Region';
	role: String = 'Role';
	addRole: String = 'Add Role';
	editRole: String = 'Edit Role';
	state: String = 'Zone';
	logout: String = 'Logout';
	addDivision: String = 'Add Division';
	addBanner: String = 'Add Banner';
	updateBanner: String = 'Update Banner';
	editDivision: String = 'Edit Division';
	addNote: String = 'Add Note';
	editNote: String = 'Edit Note';
	addCreditNote: String = 'Add Credit Note';
	editCreditNote: String = 'Edit Credit Note';
	addState: String = 'Add Zone';
	editState: String = 'Edit Zone';
	regionId: String = 'Region Id';
	regionName: String = 'Region Name';
	stateName: String = 'Zone Name';
	stateId: String = 'Zone Id';
	myProducts: String = 'Products';
	myProductOrders: String = 'Order Product'
	productCode: String = 'Product Code';
	productName: String = 'Product Name';
	batchNo: String = 'Batch No.';
	stock: String = 'Total Stock';
	expiryDate: String = 'Expiry Date';
	pts: String = 'PTS';
	ptr: String = 'PTR';
	division: String = 'Division';
	bannersList: String = 'Banners List';
	banner: String = 'Banner';
	hsnCode: String = 'HSN Code';
	boxPacking: String = 'Box Packing';
	casePacking: String = 'Case Packing';
	boxQuantity: String = 'Box Quantity';
	caseQuantity: String = 'Case Quantity';
	validTill: String = 'Valid Till';
	packing: String = 'Packing';
	free: String = 'Free';
	mrp: String = 'MRP';
	totalAmount: String = 'Total Amount';
	savingAmount: String = "Saving Amount"
	finalSavingAmt: String = "Total Saving Amount"
	companyList: String = 'Company List';
	company: String = 'Company';
	updateCompany: String = 'Update Company';
	companyId: String = 'Company Id';
	address: String = 'Address';
	companyRegistration: String = 'Company Information';
	userRegistration: String = 'Company Admin Details';
	companyConfiguration: String = 'Company Configuration';
	editCompany: String = 'Company Information';
	editCompanyUser: String = 'Company Admin Details';
	editCompanyConfiguration: String = 'Company Configuration';
	divisionId: String = 'Division Id';
	divisionName: String = 'Division Name';
	divisionHeaderName: String = 'Header Division';
	permissions: String = 'Permissions';
	selectAll: String = 'Select All';
	roleId: String = 'Role Id';
	roleName: String = 'Role Name';
	permission: String = 'Permission';
	addPermission: String = 'Add Permission';
	editPermission: String = 'Edit Permission';
	permissionId: String = 'Permission Id';
	permissionName: String = 'Permission Name';
	menuIcon: String = 'Menu Icon';
	icon: String = 'Icon';
	pageId: String = 'PageId';
	showIn: String = 'Show In';
	mobile: String = 'Mobile';
	web: String = 'Web';
	mobileAndWeb: String = 'Mobile & Web';
	headquarter: String = 'Headquarter';
	addHeadquarter: String = 'Add Headquarter';
	editHeadquarter: String = 'Edit Headquarter';
	hqId: String = 'HQ Id';
	hqName: String = 'HQ Name';
	mapDistributor: String = 'Map Distributor';
	mapRegion: String = 'Map Region';
	mapCFA: String = 'Map CFA';
	mapDivision: String = 'Map Division';
	search: String = 'Search';
	searchUserType: String = 'Search User Type';
	searchUser: String = 'Search User';
	searchState: String = 'Search Zone';
	selectState: String = 'Select Zone';
	generate: String = 'Generate';
	saveMapping: String = 'Save Mapping';
	locationName: String = 'Location Name';
	regionOfPharmarack: String = 'Region Of Company';
	shippingAddress: String = 'Shipping Address';
	panNo: String = 'PAN No.';
	status: String = 'Status';
	approvalStatus: String = 'Approval Status';
	divisionOfPharmarack: String = 'Division Of Company';
	cfaOfPharmarack: String = 'CFA Of Company';
	orderNoPrefix: String = 'Order No Prefix';
	uploadOrders: String = 'Upload Orders';
	upload: String = 'Upload';
	changeExistingColumn: String = 'Change Existing Column Headers';
	saveColumnMapping: String = 'Save Column Mapping';
	uploadExcel: String = 'Upload Excel';
	mapColumns: String = 'Map Columns';
	uploadedProduct: String = 'Uploaded Product';
	srNo: String = 'Sr.No.';
	suggestion: String = 'Suggestion';
	selectProduct: String = 'Select Product';
	searchProduct: String = 'Search Product';
	selectBatchNo: String = 'Select Batch No.';
	enterBatchNo: String = 'Enter Batch No.';
	searchBatchNo: String = 'Search Batch No.';
	box: String = 'Box Qty';
	case: String = 'Case Qty';
	selectCompany: String = 'Select Company';
	addCampaign: String = 'Create Campaign';
	campaignName: String = 'Campaign Name';
	campaignDetails: String = 'Campaign Details';
	tourPlanId: String = 'Tour Plan Id';
	tourPlanName: String = 'Tour Plan Name';
	fileLink: String = 'File';
	approvedBy: String = 'Approved By';
	updateAvgPaymentDays: String = 'Upload AVG Payment Days';
	avgPaymentDays: String = 'AVG. Payment Days';
	creditLimit: String = 'Credit Limit';
	creditDays: String = 'Credit Days';
	applyFilter: String = 'Apply Filter';
	mapToCFA: String = 'Map To CFA';
	mapToDivision: String = 'Map To Division';
	mapToDistributor: String = 'Map To Distributor';
	searchDistributor: String = 'Search Distributor';
	searchByMonth: string = "Search By Month";
	searchDivision: String = 'Search Division';
	searchPageId: String = 'Search Page Id';
	searchMR: String = 'Search MR';
	searchCFA: String = 'Search CFA';
	searchCompany: String = 'Search Company';
	searchHQ: String = 'Search HQ';
	selectHq: String = 'Select HQ';
	mapToMR: String = 'Map To MR';
	dateTime: String = 'Date Time';
	selectPageId: String = 'Select Page Id';
	callUs: String = 'Call Us';
	emailUs: String = 'Email Us';
	enterQuery: String = 'Enter query';
	//master admin
	masterAdmin: String = 'Master Admin'
	//Masters
	masters: String = 'Masters';
	masterName: String = 'Name';
	masterLastUpdate: String = 'Last Update';
	masterLastUpdatedBy: String = 'Last Updated By';
	masterCurrentStatus: String = 'Current Status';

	//Orders
	orders: String = 'Orders';
	orderNumber: String = 'Order Number';
	OrdercreateedOn: String = 'Created On';
	orderssss: String = 'Upload SSSS Order';

	//Invoice
	invoices: String = 'Invoices';
	invoiceNumber: String = 'Invoice Number';
	invoiceCreatedOn: String = ' Created On';

	// input fields placeholder text
	companyName: String = 'Company name';
	contactPerson: String = 'Contact person name';
	address1: String = 'Address 1';
	address2: String = 'Address 2';
	firstName: String = 'First Name';
	lastName: String = 'Last Name';
	email: String = 'Email';
	mobileNo: String = 'Mobile number';
	password: String = 'Password';
	confPassword: String = 'Confirm password';
	newPassword: String = 'New Password';
	currentPassword: String = 'Current Password';
	telephone: String = 'Telephone number';
	companyLogo: String = 'Company logo';
	headerColor: String = 'Header color';
	footerColor: String = 'Menu Background color';
	buttonColor: String = 'Button Background color';
	paroductLaunchingDays: String = 'Product launching days';
	productExpiredInDays: String = 'Product expired in days';
	headerRowNo: String = 'Header row number';
	headerRowNo1: String = 'Enter Header row number';
	file: String = 'Browse File';
	file1: String = 'Only xls and xlsx file of maximum 5 mb size is supported.';
	productColumnName: String = 'Product Column Name';
	boxQuantityColumnName: String = 'Box Quantity Column Name';
	caseQuantityColumnName: String = 'Case Quantity Column Name';
	sms: String = 'SMS';
	notification: String = 'Notification(s)';
	pending: String = 'Pending';
	approved: String = 'Approved';
	approveModified: String = 'Approve-Modified';
	completed: String = 'Completed';
	qunatityScheme: String = 'Quantity Offer';
	groupScheme: String = 'Group Offer';
	parentScheme: String = 'Percentage Offer';
	loadMore: String = 'Load More';
	processed: String = 'Processed';
	completelyProcessed: String = 'Completely Processed';
	partiallyProcessed: String = 'Partially Processed';
	uploaded: String = 'Uploaded';
	placed: String = 'Placed';
	rejected: String = 'Rejected';
	rejectedByDistributor: String = 'Rejected By Distributor';
	rejectedByCFA: String = 'Rejected By CFA';
	confirmed: String = 'Confirmed';
	pendingConfirmation: String = 'Pending For Confirmation';
	success: string = "Success";
	failed: string = "Failed";
	searchByDoctorHospital: String = 'Search by Doctor / Hospital';
	searchByDivisionCode: String = 'Search by Division Code';
	searchByDivisionName: String = 'Search by Division Name';
	selectInvoiceDate = 'Select Invoice Date';
	mapped = 'Mapped Product';
	unMappedProduct = 'Un-Mapped Product'
	// Support panel Order details
	//  support pannel 
	//distributor
	companyCode: String = 'Company Code';
	salesOrg: String = 'Sales Org';
	distChannel: String = 'Dist. Channel';
	drug20: String = 'Drug Licence 20B Expiry';
	drug21: String = 'Drug Licence 21B Expiry';
	locked: String = 'Locked';
	plant: String = 'Plant';
	plantName: String = 'Plant Name';
	customerNo: String = 'Customer No';
	customerName: String = 'Customer Name';


	distributorOrCode: String = 'Distributor Code';
	distributorOrName: String = 'Distributor Name';
	orderedBy: String = 'Ordered By';
	orderedByPersonCode: String = 'Ordered by person code';
	cfaCODE: String = 'CFA Code';
	orderPlaceOn: String = 'Order Placed On';
	references: String = 'References (Doctor / Hospital Code)';
	prOrderNo: String = 'PR Order Number';
	clientOrderNo: String = 'Client Order No';
	abbottSapOrderNo: String = 'SAP Order No';
	totalItemsOrdered: String = 'Total Items Ordered';
	// Outstand coloumns
	account: String = 'Account';
	accName: String = 'Acc Name';
	// cfaCode: String = 'CFA Code';
	busA: String = 'Bus A';
	docNo: String = 'Document No';
	referrence: String = 'Reference';
	docDate: String = 'Doc. Date';
	payDate: String = 'Paying Date';
	refKey3: String = 'Ref. Key 3';
	totalbalance : String = 'Total Balance';
	type: String = 'Type';
	localCrcyAmt: String = 'Local Crcy Amt';
	netDueDate: String = 'Net Due Date';

	// Scheme Details
	minimumQty: String = 'Minimum Qty';
	schemeQty: String = 'Scheme Qty';
	schemeFrom: String = 'Scheme From';
	schemeUpto: String = 'Scheme Upto';
	schemeWith: String = '% Scheme';
	schemeRemarks: String = 'Scheme Remarks';
	statusType: String = 'Status Inclusive / Exclusive';

	//Employee master-stockist mapping
	stockistNameOrCode: String = 'Stockist Name / Code';
	stockistCode: String = 'Stockist Code';
	stockistName: String = 'Stockist Name';
	distributorEmailid: String = 'Distributor email id';
	plantId: String = 'Plant ID';

	outstandDetails: String = 'Outstanding Details';
	beforeDays: String = 'Select Before Days'

	// Req Expression
	dateFormatReg: RegExp = new RegExp('YYYY-MM-DD');
	emailReg: RegExp = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
	phoneReg: RegExp = new RegExp('^[7-9][0-9]{9}$');
	fullNameReg: RegExp = new RegExp('[a-zA-Z][a-zA-Z ]*');
	firstNameReg: RegExp = new RegExp('[a-zA-Z]');
	telephoneReg: RegExp = new RegExp('^[0-9]*$');
	gstReg: RegExp = new RegExp(
		'^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}Z[0-9a-zA-Z]{1}?$'
	);
	drivingLicenseReg: RegExp = new RegExp('^[0-3][0-9]{7}$');
	panReg: RegExp = new RegExp('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$');
	alphaReg: RegExp = new RegExp('^[a-zA-Z_ ]*$');
	boxCaseReg: RegExp = new RegExp('^[0-9]*$');
	// Validation text
	enterYourQuery = 'Please enter your query';
	enterEmailPhone = 'Please enter valid Userid / Email';
	enterEmailORMobile = 'Please enter Email or Mobile Number.';
	enterValidEmail = 'Enter valid email address';
	enterToDate = 'Todate is Required';
	enterValidMobile = 'Enter Valid Mobile Number';
	enterValidPhone = ' Enter valid Mobile Number';
	checkInternet = 'No connection';
	enterCompanyName = 'Enter company name';
	enterContactPersonName = 'Enter contact person name';
	enterCompanyAddress = 'Enter company address';
	enterProductLaunchingDays = 'Enter days of before product launching';
	enterProductExpiringDays = 'Enter expiry days of short expiry product';
	negativeDays = 'Negative days are not allowed';
	enterOrderNoPrefix = 'Enter order number prefix';
	enterFirstName = 'Enter first name';
	enterLastName = 'Enter last name';
	enterEmail = 'Enter email-id';
	enterMobileNo = 'Enter Mobile no';
	enterPassword = 'Please enter password';
	enterDistributorName = 'Enter distributor name';
	selectRegion = 'Select Region';
	selectCompanyUser = "Select Company User";
	searchRegion = 'Search Region';
	selectScheme = 'Select Bonus Offers';
	searchScheme = 'Search Bonus Offers';
	selectMR = 'Select MR';
	enterCstNo = 'Enter CST number';
	enterValidCstNo = 'Enter valid CST number';
	enterValidLicenseNo = 'Enter valid license number';
	enterValidGstNo = 'Enter valid GST number';
	enterValidPANNo = 'Enter valid PAN number';
	enterGstNo = 'Enter GST number';
	enterlicenseNo = 'Enter license number';
	enterCfaName = 'Enter CFA name';
	selectUserType = 'Select user type';
	selectDivisionName = " Select division name";
	selectUserTypeErrMsg = 'Please select user type';
	selectDistributor = 'Select Distributor';
	selectDistributorErrMsg = 'Please select a distributor.';
	selectCAF = 'Select CFA';
	selectCfaCode = 'Select CFA Code';
	searchByCfaCode: String = 'Search by CFA Code';
	searchByCfaName: String = 'Search by CFA Name';
	selectCAFErrMsg = 'Please select a CFA.';
	selectStatus = 'Select Status';
	searchStatus = 'Search Status';
	searchproduct = 'Select Product';
	searchBySchemeType = 'Search by Scheme Type';
	enterHeaderRowNo = 'Enter Header Row Number';
	selectExcelFile = 'Select Excel file to upload.';
	enterRegionName = 'Enter region name.';
	selectBannerImage = 'Select banner image';
	enterStateName = 'Enter Zone name';
	enterDivisionName = 'Enter division name.';
	enterYourRemark = 'Enter your remark';
	enterRoleName = 'Enter role name';
	selectRoleType = 'Select Role Type';
	selectPermission = 'Select Permission';
	enterPermissionName = 'Enter permission name';
	selectParent = 'Select Parent';
	selectCreditNoteReturnReason = 'Select product return reason';
	enterMenuIconPath = 'Enter menu icon path';
	enterDashboardIconPath = 'Enter dashboard icon path';
	enterPageId = 'Enter page id';
	selectShowIn = 'Select show-in';
	enterHqName = 'Enter headquarter name';
	wantToGenerate = 'Are you sure, you want to generate';
	enterDistAddress = 'Enter distributor address';
	enterShippingAddress = 'Enter shipping address';
	enterPANNoOrGST = 'Please enter PAN No or GST';
	selectProductNameColumn = 'Select product name column';
	selectBoxQtyColumn = 'Select box quantity column';
	selectCaseQtyColumn = 'Select case quantity column';
	enterNoteTitle = 'Please enter note title';
	enterNoteDescription = 'Please enter note description';
	enterCampaignName = 'Please enter campaign name';
	selectUser = 'Select User';
	selectDateTime = 'Select date time';
	selectDate = 'Select Date';
	selectTime = 'Select Time';
	enterMessage = 'Please enter message';
	enterBoxQty = 'Please enter box quantity';
	enterCaseQty = 'Please enter case quantity';
	enterPrice = 'Please enter price';
	selectMedium = 'Select medium';
	enterTourName = 'Please enter tour plan name';
	selectStockStatus = 'Select Stock Availability';
	doctormaster: String = 'Doctor / Hospital Master';
	doctorName: String = 'Dr Name';
	// Draft Order
	draftOrders: String = 'Draft Order';
	draftOrderPageUrl: String = '/draft-order';	
	// Confirm Order
	confirmOrderPageUrl: String = '/confirm-order';
	// *** Access Permission Names ****/
	// Company
	createCompanyAccess = 'Add-Company';
	editCompanyAccess = 'Edit-Company';
	deactivateCompanyAccess = 'Deactivate-Company';
	// Distributor
	addDistributorAccess = 'Add-Distributor';
	editDistributorAccess = 'Edit-Distributor';
	deactivateDistributorAccess = 'Deactivate-Distributor';
	mapDistributorAccess = 'Map-Distributor';
	avgPayDistributorAccess = 'Avg-Pay-Distributor';
	// Region
	addRegionAccess = 'Add-Region';
	editRegionAccess = 'Edit-Region';
	deactivateRegionAccess = 'Deactivate-Region';
	// Division
	addDivisionAccess = 'Add-Division';
	editDivisionAccess = 'Edit-Division';
	deactivateDivisionAccess = 'Deactivate-Division';
	mapDivisionAccess = 'Map-Division';
	// HQ
	addHQAccess = 'Add-HQ';
	editHQAccess = 'Edit-HQ';
	deactivateHQAccess = 'Deactivate-HQ';
	// Zone
	addZoneAccess = 'Add-Zone';
	editZoneAccess = 'Edit-Zone';
	deactivateZoneAccess = 'Deactivate-Zone';
	// CFA
	addCFAAccess = 'Add-CFA';
	editCFAAccess = 'Edit-CFA';
	deactivateCFAAccess = 'Deactivate-CFA';
	mapCFAAccess = 'Map-CFA';
	// User
	addUserAccess = 'Add-User';
	editUserAccess = 'Edit-User';
	deactivateUserAccess = 'Deactivate-User';
	permissionsUserAccess = 'Permissions-User';
	//Mapping
	public searchApprover1 = "Search Approver 1";
	public searchApprover2 = "Search Approver 2";
	// Place Order
	placeOrderProductAccess = 'Place-Order-Product';
	placeOrderNewProductsAccess = 'Place-Order-New-Products';
	placeOrderShortExpiryAccess = 'Place-Order-Short-Expiry';
	placeOrderAccess = 'Place-Order';
	// My Orders
	downloadMyOrdersAccess = 'Download-My-Orders';
	// Upload-Order
	uploadOrderAccess = 'Upload-Order';
	// Download-Invoices
	downloadInvoiceAccess = 'Download-Invoice';
	// Approve-Reject Order
	approveRejectOrderAccess = 'Approve-Reject-Order';
	//Company User
	searchCompanyUser = " Search Company User";
	// Campaign
	addCampaignAccess = 'Add-Campaign';
	editCampaignAccess = 'Edit-Campaign';
	viewCampaignAccess = 'View-Campaign';
	deactivateCampaignAccess = 'Deactivate-Campaign';
	// Tour Plan
	addTourPlanAccess = 'Create-TourPlan';
	approveRejectTourPlanAccess = 'Approve-Reject-TourPlan';
	deactivateTourPlan = 'Deactivate-TourPlan';
	// Notes
	addNotesAccess = 'Add-Notes';
	editNotesAccess = 'Edit-Notes';
	deleteNoteAccess = 'Delete-Notes';
	// Role
	addRoleAccess = 'Add-Role';
	editRoleAccess = 'Edit-Role';
	deactivateRoleAccess = 'Deactivate-Role';
	// Banner
	addBannerAccess = 'Add-Banner';
	editBannerAccess = 'Edit-Banner';
	deactivateBannerAccess = 'Deactivate-Banner';
	selectReasonPlaceholder = 'Select Hold Reason';
	searchReason = 'Search Reason';
	// Key
	authTokenKey = 'AuthorizationToken';
	userKey = 'UserKey';
	permissionsKey = 'permissions';
	payload = 'payload';
	userIdKey = 'UserId';
	companyIdKey = 'companyId';
	setPayLoadForSelect = 'setPayLoadForSelect';
	platformsKey = 'Platforms';
	loggedUserTypeKey = 'UserType';
	selectedPermissionObj = 'SelectedPermissionObj';
	creditNoteCartArr = 'creditNoteCartArr';
	placeOrderCartArrKey = 'placeOrderCartArr';
	productCodeCartArrKey = 'productCodeCartArr';
	playerIdKey = 'playerIdKey';
	companyObjKey = 'companyObjKey';
	reloadFirstKey = 'reloadFirstKey';
	showConfirmAlert = 'showConfirmAlert';
	isSunpharmaOrder = 'IsSunPharmaOrderFlag';
	isDraftOrder = 'IsDraftOrderFlag';
	isConfirmOrder = 'IsConfirmOrderFlag';	
	// Econsent 

	agreeMsg = 'Agree';
	disagreeMsg = 'Disagree';

	// ************* End Url ***************

	// Company
	companiesUrl = 'company';
	createCompanyUrl = 'company/add';
	deleteCompanyUrl = 'company/delete';
	getSelectedCompanyDetailsUrl = 'company/';
	updateCompanyUrl = 'company/update';
	customCompanyUrl = 'company/custom';
	fromTitleLabel = 'Select From Date';
	toTitleLabel = 'Select To Date';
	dateTitleLabel = 'Select Date';
	// Company Config
	createCompanyConfigUrl = 'companyConfig/add';
	updateCompanyConfigUrl = 'companyConfig/update';
	deleteCompanyConfigUrl = 'companyConfig/delete';
	getSelectedCompanyConfigDetailsUrl = 'companyConfig/';
	// User
	companyUsersUrl = 'user';
	createUserUrl = 'user/add';
	updateUserUrl = 'user/update';
	deleteUserUrl = 'user/delete';
	getSelectedUserDetailsUrl = 'user/';
	userCustomUrl = 'user/custom';
	getUsersByRoleType = 'user/getUsersByRoleType';
	saveAccessPermissionsUrl = 'user/saveAccessPermissions';
	userRegionsUrl = 'user/regions';
	forgotPasswordResetKeyUrl = 'user/getPasswordResetKey';
	userPasswordResetKeyUrl = 'user/getUserByPasswordResetKey';
	companyUserList = 'user/getCompanyUsers';
	updateUserProfileViewedStatus = "user/updateprofileviewstatus";
	updateStockAndSalesNotificationDay = "user/distributorMonth";
	changePasswordurl ='user/changePassword';
	forgetPasswordUrl = `user/forGotPassword`;
	enabledEmailStatusUrl = 'user/enabledEmailStatus';
	//UserType
	getCompanyUserTypes = 'user/getCompanyUserTypes';
	getCompanyUsersByType = 'user/getCompanyUsersByType';
	getMRApprover = 'user/getMRApprover';

	// Region
	regionsUrl = 'region';
	deleteRegionUrl = 'region/delete';
	getSelectedRegionDetailsUrl = 'region/';
	createRegionUrl = 'region/add';
	updateRegionUrl = 'region/update';
	regionCustomUrl = 'region/custom';
	regionMappings = 'region/getMapping';
	regionMap = 'region/map';
	generateRegion = 'region/generate';
	// Distributor
	distributersUrl = 'distributor';
	createDistributorUrl = 'distributor/add';
	updateDistributorUrl = 'distributor/update';
	deleteDistributorUrl = 'distributor/delete';
	getSelectedDistributorDetailsUrl = 'distributor/';
	distributorCustomUrl = 'distributor/custom';
	distributorMappings = 'distributor/getMapping';
	distributorMap = 'distributor/map';
	generateDistributor = 'distributor/generate';
	distributorListByUserUrl = 'distributor/listByUser';
	distributorTotalUrl = 'distributor/total';
	distributorDetailsUrl = 'distributor/details';

	//doctor instituted
	supportDistributor = 'support/distributor/distributorlist';
	supportDistributorTotal = 'support/distributor/total';
	supportDoctor = 'support/doctorInstitution/list';
	supportDoctorTotal = 'support/doctorInstitution/total';
	productDetailsUrl = 'support/doctorInstitution/productdetails';
	supportDoctorDetails = 'support/doctorInstitution/doctorinstitutiondetails';

	// ssss product mapping
	uploadexcelheader = 'support/ssss/columns';
	getColumnMappingnew = 'support/ssss/excelHeaderColumn';
	getssssexcelHeaderColumn = 'support/ssss/excelHeaderColumn?';
	saveExcelHeaderColumn = 'support/ssss/saveExcelHeaderColumn';
	getProductMapping = 'support/ssss/getProductMapping';
	ssssProductMapping = 'support/ssss/ssssProductMap';
	// support/upload-statement", supportProductMappingRoutes';
	// CFA
	cFAsUrl = 'cfa';
	deletecfaUrl = 'cfa/delete';
	getSelectedCFADetailsUrl = 'cfa/';
	createCfaUrl = 'cfa/add';
	updateCfaUrl = 'cfa/update';
	cfaCustomUrl = 'cfa/custom';
	cfaMappings = 'cfa/getMapping';
	cfaMap = 'cfa/map';
	generateCFA = 'cfa/generate';
	getCFAbyComapanyId = "cfa/cfabycompanyId";
	cfaListByDistributorUrl = 'cfa/listByDistributor';
	// Role
	rolesUrl = 'role';
	createRoleUrl = 'role/add';
	updateRoleUrl = 'role/update';
	deleteRoleUrl = 'role/delete';
	roleCustomUrl = 'role/custom';
	getSelectedRoleDetailsUrl = 'role/';
	// State
	statesUrl = 'state';
	deleteStateUrl = 'state/delete';
	getSelectedStateDetailsUrl = 'state/';
	createStateUrl = 'state/add';
	updateStateUrl = 'state/update';
	stateCustomUrl = 'state/custom';
	// Product
	productsUrl = 'product';
	shortExpiry = 'product/shortExpiry';
	newProduct = 'product/new';
	customProduct = 'product/custom';
	getProducts = 'product/products';
	// Division
	divisionsUrl = 'division';
	deleteDivisionUrl = 'division/delete';
	getSelectedDivisionDetailsUrl = 'division/';
	createDivisionUrl = 'division/add';
	updateDivisionUrl = 'division/update';
	divisionCustomUrl = 'division/custom';
	divisionMappings = 'division/getMapping';
	divisionMap = 'division/map';
	generateDivision = 'division/generate';
	divisionForDropdownUrl = 'division/forDropdown';
	divisionListByDistributorUrl = 'division/listByDistributor';
	divisionListByCFAUrl = 'division/listByCFA';
	// Permission
	permissionsUrl = 'permission';
	createPermissionUrl = 'permission/add';
	updatePermissionUrl = 'permission/update';
	deletePermissionUrl = 'permission/delete';
	permissionCustomUrl = 'permission/custom';
	getSelectedPermissionDetailsUrl = 'permission/';
	getPermissionList = 'permission/list';
	saveCompanypermissinos = 'permission/saveCompanyPermissins';
	roleWisePermissionUrl = 'permission/getRoleWisePermission';
	// Role Permission
	rolePermissionCustomUrl = 'rolePermission/custom';
	// User Permission
	userPermissionCustomUrl = 'userPermission/custom';
	userPermissionActionUrl = 'userPermission/actions';
	// HQ
	hqCustomUrl = 'hq/custom';
	createHQUrl = 'hq/add';
	updateHQUrl = 'hq/update';
	deleteHQUrl = 'hq/delete';
	getSelectedHQDetailsUrl = 'hq/';
	// Order
	saveOrder = 'order/saveByDivision';
	saveOrderForUploadOrderOnly = 'order/saveByDivisionForUploadOrder';
	updateOrder = 'order/updateOrder';
	customOrder = 'order/custom';
	customOrderDetails = 'order/customDetails';
	orderApproveRejectUrl = 'order/approval';
	pendingApproval = 'order/pendingApproval';
	downloadOrderUrl = 'order/downloadOrder';
	downloadAttachOrderUrl = 'order/downloadAttachfile';
	myOrdersCountUrl = 'order/ordersCount';
	myOrdersTotalUrl = 'order/ordersTotal';
	mySavingsTotalUrl = 'order/savingsTotal';
	pendingOrdersCountUrl = 'order/pendingOrdersCount';
	pendingOrdersAmountUrl = 'order/ordersTotal';
	confirmOrderUrl = 'order/getOrderObject';
	confirmOrderReject = 'order/updateOrderConfirmation';
	draftOrder = 'order/draft';
	draftOrderDetails = 'order/draftOrderDetails';
	draftSummary = 'order/draftSummary';
	uploadOrderPageUrl = '/upload-order/sun-pharma';
	// Schemes
	schemesUrl = 'product/schemes';
	schemeCustomUrl = 'scheme/custom';
	// Read Columns
	readExcelColumnsUrl = 'excel/columns';
	saveColumnMappingUrl = 'excel/saveColumnMapping';
	excelProductDataUrl = 'excel/data';
	saveProductMappingUrl = 'excel/saveProductMapping';
	saveProductCoversionQty = 'excel/saveProductCoversionQty';
	getUnmappedProduct = 'excel/unmappedProduct'
	// Notes
	createNoteUrl = 'note/add';
	updateNoteUrl = 'note/update';
	deleteNoteUrl = 'note/delete';
	notesCustomUrl = 'note/custom';
	getSelectedNoteDetailsUrl = 'note/';
	// Invoice
	invoiceCustomUrl = 'invoice/custom';
	invoiceTotalCustomUrl = 'invoice/custom';
	invoiceCustomDetailsUrl = 'invoice/customDetails';
	downloadInvoiceUrl = 'invoice/downloadInvoice';
	// Campaign
	createCampaignUrl = 'campaign/add';
	campaignCustomUrl = 'campaign/custom';
	getSelectedCampignDetailsUrl = 'campaign/';
	deleteCampaignUrl = 'campaign/delete';
	updateCampaignUrl = 'campaign/update';
	// Tour
	createTourPlanUrl = 'tourPlan/add';
	customTourUrl = 'tourPlan/custom';
	deleteTourUrl = 'tourPlan/delete';
	updateTourPlanUrl = 'tourPlan/update';
	// Dashboard
	dashboardRegionsUrl = 'dashboard/regions';
	dashboardHQsUrl = 'dashboard/hqs';
	dashboardMRsUrl = 'dashboard/mrs';
	dashboardDistUrl = 'dashboard/distributors';
	dashboardDivisionUrl = 'dashboard/divisions';
	dashboardProductsUrl = 'dashboard/products';
	dashboardTotalSalesUrl = 'dashboard/totalSales';
	dashboardTotalProductsUrl = 'dashboard/totalProducts';
	dashboardTotalOutstandingUrl = 'dashboard/totalOutstanding';
	dashboardDivisionWiseSaleUrl = 'dashboard/divisionWiseSale';
	dashboardDateWiseSaleUrl = 'dashboard/dateWiseSale';
	dashboardProductWiseSaleUrl = 'dashboard/productWiseSale';
	dashboardOutstandingInvoicesUrl = 'dashboard/outstandingInvoices';
	dashboardDistributorsSaleUrl = 'dashboard/distributorsSale';
	dashboardHQWiseSaleUrl = 'dashboard/hqWiseSale';
	saleVsCollectionUrl = 'dashboard/collectionsData';
	// avg
	uploadAvgUrl = 'excel/updateAVGPaymentDays';
	// Credit Note
	creditNoteBatchNoUrl = 'creditNote/batchNoByProductCode';
	creditNoteCustomUrl = 'creditNote/custom';
	createCreditNoteUrl = 'creditNote/saveByDivision';
	creditNoteDetailsUrl = 'creditNote/details';
	sendCreditDetailRequest = 'creditNote/sendCreditDetailRequest';
	// Banner
	bannersCustomUrl = 'banner/custom';
	bannerTotalUrl = 'banner/totalCount';
	createBannerUrl = 'banner/add';
	updateBannerUrl = 'banner/update';
	deleteBannerUrl = 'banner/delete';
	getSelectedBannerDetailsUrl = 'banner/';
	getColumnMappingUrl = 'excel/getColumnMapping';
	// Enquiry
	createEnquiryUrl = 'enquiry/add';
	// Chron
	getNotificationsUrl = 'cron/getInAppNotifications';
	totalNotifications = 'cron/totalNotifications';
	updateNotificationsUrl = 'cron/updateInAppNotifications';
	getInAppNotificationsTotal = 'cron/getInAppNotificationsTotal';
	getCompanySettings = 'company/getSettings';

	//master-upload
	masterUploadFile = 'dashboard/uploadFile';
	masterDownloadFile = 'dashboard/downloadFile';
	masterOrderFileList = 'dashboard/ordersFile';
	masterDetails = 'dashboard/masterDetails';
	uploadInvoiceDetails = 'dashboard/updateInvoiceLRNumber';

	//email-upload-order
	emailUploadOrderList = "order/emailOrderList";
	updateEmailOrderStatus = "order/updateEmailOrderStatus";

	// support panel
	supportInvoice = 'support/invoice/custom';
	supportProduct = "support/product/custom";
	supportEmployee = "support/employee/custom";
	supportFileLog = "support/file-logs/custom";
	supportLastUpdatedDate = 'support/invoice/lastUpdatedDate';

	//system logs
	systemLogs = 'system-logs';
	s3logs = "system/s3logs"
	//email order conversion logs
	emailOrderStatus = "order/getEmailOrderStatus";
	downloadEmailUploadedFile = "order/downloadEmailUploadedFile";

	//Secondary stock and sales
	stockandsalesUrl = "stockandsales/getDetails";
	updateStatusOfStockSales = "stockandsales/updateStatus";
	updateStockAndSales = "stockandsales/update";
	downloadStockAndSalesDetails = "stockandsales/download-details";
	getStockAndSalesSummary = "stockandsales/summary";
	getStockAndSalecCount = "stockandsales/TotalCount";

	//Product Mapping
	distributorMppedProduct = "distributorProductMapping/getMappedDistributorProducts";
	productByCompany = "product/byCompanyId";
	productMappedUrl = "distributorProductMapping/saveDistributorProductMpping";
	removeMappedProduct = "distributorProductMapping/deleteDistributorMappedProduct/";
	removeUnmappedProduct = "distributorProductMapping/deleteDistributorUnMappedProduct/"
	readProductFromExcelFile = "distributorProductMapping/getDistributorProductFromExcel";

	//User logs
	getUserLogsUrl = "userlogin/getUserLog";
	getDownloadUserLogs = "userlogin/download";

	//outstanding
	OutstandingSupport = 'support/outstanding/outstandingDetails';


	// Support panel URL
	getOrderDetailsUrl = "support/order/fetchSupportPannelOrderDetails";

	//Distributor Summary
	// supportDistributor = 'support/distributor/distributorlist';
	// supportDistributorTotal = 'support/distributor/total';

	//Credit details
	getCreditDetails = "support/credit/details";
	getHeaderDivisions = "support/credit/headerDivisionList/";
	getTransactionTypes = "support/credit/transactionTypes/";
	getOrganizationList = "support/credit/organizations/";

	//Employee master map
	getEmpMasterDistributorMap = "support/employee/stockists";

	// Employee master doctor hospital mapping
	getEmpMasterDoctorHospitaMap = "support/employee/doctorHospital";

	//Track Upload excel file Product
	saveUploadlog = "excel/trackUploadLog"
	updateUploadProductStatus = "excel/updateUplaodProductStatus"

	//show Econsent 
	acceptEconsentAgreement = "user/acceptAgreement";

	//product mapping History 
	getProductMappingHistoryDetails = "distributorProductMapping/getProductMappingHistory";
	findAndReplaceProductMapping="distributorProductMapping/findAndReplace";

	// DistributorStoreMapping
	getDistributorStoreMapping = 'support/distributorstore/getDistributorStoreMapping?'
	saveDistributorStoreMapping = 'support/distributorstore/saveDistributorStoreMapping'

	//MappedCompanycfa
	getMappedCompanyCfa = 'cfa/getMappedCompanyCfas';
	saveMappedCompanyCfa = 'cfa/saveMappedCompanyCfas';

	getDistributorCitySate = "distributor/getCitySate";

	// Upload File
	uploadfileAttachment = 'upload/uploadAttachment';

	// ADC
	getStockists = 'adc/utility/stockists';
    getRegion = 'adc/utility/region';
    getCustomer = 'adc/utility/customer';
    tmName = 'adc/fieldForce/getTMName';

	stockAndSalesReport = 'adc/stockAndSales/getStockAndSalesReport';
    stockAndSalesReportDownload = 'adc/stockAndSales/excel/download';
    salesReport = 'adc/sales/getSalesRegister';
	salesReportDownload = 'adc/sales/excel/download';
	fieldForce = 'adc/fieldForce/getSalesRegisterTm';
    fieldForceDownload = 'adc/fieldForce/excel/download';
	
	// Mediaum
	smsMedium = 1;
	emailMedium = 2;
	notificationMedium = 3;

	// Scheme Type Id
	qunatitySchemeTypeId = 1;
	parentSchemeTypeId = 2;
	groupSchemeTypeId = 3;

	// Role Id
	superAdminRoleId = 1;
	companyAdminRoleId = 2;
	mrRoleId = 3;
	cfaRoleId = 4;
	distributerRoleId = 5;
	companyUsersRoleId = 6;
	operationRoleId = 7;

	// Role Type
	companyUserRoleType = 1;
	distributorRoleType = 2;
	CFARoleType = 3;
	MRRoleType = 4;
	operationRoleType = 7

	// Show In array of Credit note return reson
	outstandingBeforeDays = [{
		'before': 'Before 30 Days',
		'beforeDays': 30
	},
	{
		'before': 'Before 60 Days',
		'beforeDays': 60
	},
	{
		'before': 'Before 90 Days',
		'beforeDays': 90
	}];

	//Scheme status
	schemeDetailsStatusArray = [
		{
			IsInclusive: 0,
			status: "Exclusive"
		},
		{
			IsInclusive: 1,
			status: "Inclusive"
		},
	]

	//Employee-log  status
	employeeLogsStatusArray = [
		{
			IsInclusive: 0,
			status: "Un-Locked"
		},
		{
			IsInclusive: 1,
			status: "Locked"
		},
	]

	//Employee-log  Register
	employeeLogsRegisterArray = [
		{
			IsInclusive: 0,
			register: "Not Registered"
		},
		{
			IsInclusive: 1,
			register: "Register"
		},

	]

	//Scheme status
	schemeTypeArray = [
		{
			SchemeType: "Percentage",
			Id: 0
		},
		{
			SchemeType: "Quantity",
			Id: 1
		},
	]

	//Scheme status
	distributorStatusArray = [
		{
			Locked: 1,
			status: "Locked"
		},
		{
			Locked: 0,
			status: "Unlocked"
		},
	]
	//Distributor Summary status
	distributorDetailsStatusArray = [
		{
			statusId: 0,
			status: this.inActive
		},
		{
			statusId: 1,
			status: this.active
		}
	]

	// Show In array of product staus
	globalProductStatusArray = [{
		'statusId': 0,
		'status': this.active
	},
	{
		'statusId': 1,
		'status': this.inActive
	}
	];

	//Show doctor hospital type
	empDoctorHospitalArray = [
		{
			'typeId': 'D',
			'type': 'Doctor'
		},
		{
			'typeId': 'H',
			'type': 'Hospital'
		},

	]

	// Show In array of product staus
	globalStockAvailabilityStatusArray = [{
		'statusId': 0,
		'status': "Yes"
	},
	{
		'statusId': 1,
		'status': "No"
	}
	];


	// Role type array of object
	roleTypeArray = [
		{
			RoleType: this.distributorRoleType,
			RoleTypeName: this.distributor
		},
		{
			RoleType: this.CFARoleType,
			RoleTypeName: this.cfa
		},
		{
			RoleType: this.MRRoleType,
			RoleTypeName: this.mr
		},
		{
			RoleType: this.companyUserRoleType,
			RoleTypeName: this.companyUsers
		},
		{
			RoleType: this.operationRoleType,
			RoleTypeName: this.operationUser
		}
	];

	// Role type array of object
	roleTypeArray2 = [
		{
			RoleType: this.distributorRoleType,
			RoleTypeName: this.distributor
		},
		{
			RoleType: this.CFARoleType,
			RoleTypeName: this.cfa
		},
		{
			RoleType: this.MRRoleType,
			RoleTypeName: this.mr
		}
	];

	// Show In array of object
	showInArray = [
		{
			showInId: 0,
			showInName: this.web
		},
		{
			showInId: 1,
			showInName: this.mobile
		},
		{
			showInId: 2,
			showInName: this.mobileAndWeb
		}
	];

	// Show In array of object
	globalMediumArray = [
		{
			mediumId: this.smsMedium,
			medium: this.sms
		},
		{
			mediumId: this.emailMedium,
			medium: this.email
		},
		{
			mediumId: this.notificationMedium,
			medium: this.notification
		}
	];

	// Show In array of order staus
	globalOrderStatusArray = [
		{
			statusId: 0,
			status: this.pending
		},
		{
			statusId: 1,
			status: this.completed
		}
	];

	// Show In array of order staus
	globalOrderStatusArray2 = [
		{
			statusId: 0,
			status: this.processed
		},
		{
			statusId: 1,
			status: this.uploaded
		},
		{
			statusId: 3,
			status: this.approved
		},
		{
			statusId: 4,
			status: this.rejected
		},
		{
			statusId: 5,
			status: this.pending
		},
		{
			statusId: 7,
			status: this.rejectedByDistributor
		},
		{
			statusId: 6,
			status: this.pendingConfirmation
		},
		// {
		// 	statusId: 9,
		// 	status: this.rejectedByCFA
		// },
		{
			statusId: 11,
			status: this.completelyProcessed
		},
		{
			statusId: 10,
			status: this.partiallyProcessed
		},
		{
			statusId: 2,
			status: this.placed
		}
	];

	// Show In array of order staus
	productMappingArray = [
		{
			statusId: 1,
			status: this.mapped
		},
		{
			statusId: 2,
			status: this.unMappedProduct
		}
	];

	emailOrderStatusArray = [
		{
			statusId: 0,
			status: "Pending"
		},
		{
			statusId: 1,
			status: "Processing"
		},
		{
			statusId: 2,
			status: this.success
		},
		{
			statusId: 3,
			status: this.failed
		},

		{
			statusId: 4,
			status: "Partial Success"
		}
	]

	// Show In array of Invoice Status
	globalInvoiceStatus = [
		{
			StatusType: this.paid
		},
		{
			StatusType: this.unPaid
		}
	];

	// Show In array of Credit note return reson
	globalCreditNoteReturnReason = [
		{
			ReturnReason: this.expiray
		},
		{
			ReturnReason: this.nonMoving
		},
		{
			ReturnReason: this.breakage
		}
	];

	globalCart: any[] = [];
	// Pagination Limit
	paginationLimit = 15;
	paginationLimitForDropDowns = 50;
	// Approve Order status
	approveOrderStatus = 1;
	rejectOrderStatus = 2;

	// Approve Order Obj
	globalApproveOrder: any;

	// My Order object
	globalMyOrder: any;

	// globalUserData for SuperAdmin or Distributor
	globalUserData: any;

	// My Invoice Obj
	globalMyInvoice: any;

	globalCalendarObject: any = {
		// inputDate: new Date('2018-08-10'), // default new Date()
		// fromDate: new Date('2016-12-08'), // default null
		toDate: new Date(), // default null
		showTodayButton: false, // default true
		// closeOnSelect: true, // default false
		// disableWeekDays: [4], // default []
		// mondayFirst: true, // default false
		setLabel: 'OK', // default 'Set'
		// todayLabel: 'T', // default 'Today'
		// closeLabel: 'C', // default 'Close'
		// disabledDates: this.disabledDates, // default []
		titleLabel: 'Select To Date', // default null
		monthsList: [
			'Jan',
			'Feb',
			'March',
			'April',
			'May',
			'June',
			'July',
			'Aug',
			'Sept',
			'Oct',
			'Nov',
			'Dec'
		],
		weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
		dateFormat: 'YYYY-MM-DD', // default DD MMM YYYY
		clearButton: false, // default true
		momentLocale: 'pt-BR', // Default 'en-US'
		yearInAscending: true, // Default false
		// btnCloseSetInReverse: true, // Default false
		btnProperties: {
			expand: 'block', // Default 'block'
			fill: '', // Default 'solid'
			size: '', // Default 'default'
			disabled: '', // Default false
			strong: '', // Default false
			color: '' // Default ''
		},
		arrowNextPrev: {
			nextArrowSrc: '../assets/images/arrow_right.svg',
			prevArrowSrc: '../assets/images/arrow_left.svg'
		} // This object supports only SVG files.
	};

	globalSingleCalendarObject: any = {
		// inputDate: new Date('2018-08-10'), // default new Date()
		// fromDate: new Date('2016-12-08'), // default null
		toDate: new Date(), // default null
		showTodayButton: false, // default true
		// closeOnSelect: true, // default false
		// disableWeekDays: [4], // default []
		// mondayFirst: true, // default false
		setLabel: 'OK', // default 'Set'
		// todayLabel: 'T', // default 'Today'
		// closeLabel: 'C', // default 'Close'
		// disabledDates: this.disabledDates, // default []
		titleLabel: 'Select Date', // default null
		monthsList: [
			'Jan',
			'Feb',
			'March',
			'April',
			'May',
			'June',
			'July',
			'Aug',
			'Sept',
			'Oct',
			'Nov',
			'Dec'
		],
		weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
		dateFormat: 'YYYY-MM-DD', // default DD MMM YYYY
		clearButton: false, // default true
		momentLocale: 'pt-BR', // Default 'en-US'
		yearInAscending: true, // Default false
		// btnCloseSetInReverse: true, // Default false
		btnProperties: {
			expand: 'block', // Default 'block'
			fill: '', // Default 'solid'
			size: '', // Default 'default'
			disabled: '', // Default false
			strong: '', // Default false
			color: '' // Default ''
		},
		arrowNextPrev: {
			nextArrowSrc: '../assets/images/arrow_right.svg',
			prevArrowSrc: '../assets/images/arrow_left.svg'
		} // This object supports only SVG files.
	};

	globalSingleCalendarObject2: any = {
		// inputDate: new Date('2018-08-10'), // default new Date()
		// fromDate: new Date('2016-12-08'), // default null
		fromDate: new Date(), // default null
		showTodayButton: false, // default true
		// closeOnSelect: true, // default false
		// disableWeekDays: [4], // default []
		// mondayFirst: true, // default false
		setLabel: 'OK', // default 'Set'
		// todayLabel: 'T', // default 'Today'
		// closeLabel: 'C', // default 'Close'
		// disabledDates: this.disabledDates, // default []
		titleLabel: 'Select Date', // default null
		monthsList: [
			'Jan',
			'Feb',
			'March',
			'April',
			'May',
			'June',
			'July',
			'Aug',
			'Sept',
			'Oct',
			'Nov',
			'Dec'
		],
		weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
		dateFormat: 'YYYY-MM-DD', // default DD MMM YYYY
		clearButton: false, // default true
		momentLocale: 'pt-BR', // Default 'en-US'
		yearInAscending: true, // Default false
		// btnCloseSetInReverse: true, // Default false
		btnProperties: {
			expand: 'block', // Default 'block'
			fill: '', // Default 'solid'
			size: '', // Default 'default'
			disabled: '', // Default false
			strong: '', // Default false
			color: '' // Default ''
		},
		arrowNextPrev: {
			nextArrowSrc: '../assets/images/arrow_right.svg',
			prevArrowSrc: '../assets/images/arrow_left.svg'
		} // This object supports only SVG files.
	};

	// Show In array of Scheme Types
	globalSchemeTypeArray = [
		{
			SchemeTypeId: this.qunatitySchemeTypeId,
			SchemeType: this.qunatityScheme
		},
		{
			SchemeTypeId: this.parentSchemeTypeId,
			SchemeType: this.parentScheme
		},
		{
			SchemeTypeId: this.groupSchemeTypeId,
			SchemeType: this.groupScheme
		}
	];
	"selectedCompanyId" = 1;

	updateOrderApproverStatus: string = "order/updateApproverOrderStatus";
	pendingCompanyOrderSummary = "order/pendigCompanyOrderSummary";
	getDistributorList = "distributor/getDistributorList";
	getGlobalDistributors = "distributor/getGlobalDistributors"
	getCreditNoteDetails = "creditNote/creaditNotByDistributors";

	getLastUpdatedCurrentStockDate = "product/getLastUpdateOfCurrentStock";
	addProductIntoCart = "cart/addProductInCart";
	getCartProducts = "cart/getCartProducts";
	removeProductFromCart = "cart/removeProduct";
	updateCartProductStatus = "cart/updateCartProductStatus";
	getCartCount = "cart/getCartCount";
	updateCartProductQunatity = "cart/updateCartProductQunatity";

	// Draft Order details
	userId;
	userType;
	draftNo: string = "Draft No";
	totalDraftItems: string = "Total Items";
	totalDraftAmount: string = "Total Amount";
	draftDate: string = "Draft Date";
	draftBy: string = "Draft By";
	myDraft: string = "Draft Orders";
	emailOrderNo: string = "Select Email Order Number";
	orderPriceType = { "unitPrice": 1, "boxPrice": 2, "casePrice": 3 };
	notUploadedOrder = "Failed Orders";
	gstInvoiceNo = "GST Invoice Number";
	accountBlockMSG = "Your account has been blocked. Please contact sales team.";
	maxFreeQtyMsg = "Free Quantity should be less than Order Quantity.";
	beforMonthEnd = 2;
	monthEndMessage = "Month End should be greater than 1 and less then 31"
	enterDaysMessage = "Please enter days between 0 to 30.";
	soldStockLabel = "Sales For Last 30 Days";
	lastCurrentStockDate = "Current Stock and Sales as on";
	isPendiongOrderConfirmationDisabled = "isPendingOrderConfirmationDisabled"
	orderRecomendedQty = {
		unit: 1,
		box: 2,
		case: 3
	}
	recommended_qty = "Recommended Qty";
	headerRowByDistributorId = "excel/headerRowByDistributorId";
	passwordPolicyMSG = `New password rules: <br>
	<ul>
		<li> Password must be 8 to 15 characters long.
		<li> Password must contain atleast 1 - upper case character.
		<li> Password must contain atleast 1 - lower case character.
		<li> Password must contain atleast 1 - numeric digit
		<li> Password must contain atleast 1 - special character
	</ul`;

	CLOSE_SIDEBAR = 'close-sidebar-width';
	OPEN_SIDEBAR = 'open-sidebar-width';

	uploadOrderKey = 'UploadOrderUrl';
	cfaAndDivisionNotMapped = 'CFA And Division Not Mapped';
	cfaNotMapped = 'CFA Not Mapped';
	divisionNotMapped = 'Division Not Mapped';
	nearestMOQMsg = 'Quantity updated to nearest MOQ';
	sessionTimeOutInSecond = 86400;
	idleTimeOutInSecond=10;
	warningMsg = 'Please check the highlighted product, kindly ensure the product mapping and order quantity is mentioned correctly.';
	converionSettingTitle = 'Conversion Setting';
	converionSettingMsg = 'Please set units per box. eg. 10 vials per one box, 10 penfills per one box';
	sendPasswordResetLink="user/sendPasswordResetLink";
	approvePendingOrder = "Approve Order";
	downloadXmlFile= "order/donwloadXml";

	monthAndNumber: [
        { Name: 'January', Number: 0 }, { Name: 'February', Number: 1 },
        { Name: 'March', Number: 2 }, { Name: 'April', Number: 3 },
        { Name: 'May', Number: 4 }, { Name: 'June', Number: 5 },
        { Name: 'July', Number: 6 }, { Name: 'August', Number: 7 },
        { Name: 'September', Number: 8 }, { Name: 'October', Number: 9 },
        { Name: 'November', Number: 10 }, { Name: 'December', Number: 11 }];
}
