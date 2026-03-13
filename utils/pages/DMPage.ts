import { expect, Page, Locator } from '@playwright/test';

export const DMpage_Locators = {

    // Data Messenger Icon and title
    dmIcon: "//*[@data-test='data-messenger-handle']/span[@data-test='react-autoql-icon']",
    dmTitle: "//*[@class='header-title' and text()='Data Messenger']",

    // Data Messenger drawer
    dmQueryInput: "//*[@class='react-autoql-chatbar-input-container']//input",
    dmQuerySendBtn: "//*[@class='react-autoql-input-send-button']",

    // Data messenger response table
    dmResponseTable: "//*[@class='drawer-content-wrapper']//*[@data-test='react-autoql-table']",

    // Response Table - Charts & Other options
    dmResponseTableMoreOptions: "//*[@class='drawer-content-wrapper']//button[@data-tooltip-html='More options']",
    dmResponseTableAddToDashboardOption: "//*[text()='Add to Dashboard...']",
    
    //Exporting the xpaths from Selenium
	
	ProfileIcon: "//*[contains(@class,'Avatar')]",
	ProfileLogout:"//*[contains(text(), 'Log Out')]",
	ChatdrawerIcon: "//*[@data-test='data-messenger-handle']",
	ChatWindowHeader:"//*[@class='header-title' and contains(text(),'Data Messenger')]",
	ChatWindow_DeleteIcon: "//*[@data-tooltip-content='Clear queries']",
	ChatWindow_DeleteIcon_message: "Clear all queries & responses?",
	ChatWindow_Delete_Clear: "//div[text()='Clear']",
	ChatWindow_Delete_Cancel: "//div[text()='Cancel']",
	
	ChatWindow_CancelIcon: "//*[@data-tooltip-content='Close Data Messenger']",

	
	ChatWindow_TextField: "//*[@class='react-autoql-chatbar-input-container']//input",
	DB_CreateNewDB_Name: "//*[contains(@class, 'MuiInputBase-input')]",
	ChatWindow_ChatVoicerecorder: "//*[@class='chat-voice-record-button']",

	ChatWindow_WaterMark: "//*[@class='watermark']",



	ChatWindow_FullScreen: "//*[@data-tooltip-content='Full Screen']",

	ChatWindow_ManageFilters: "//*[@data-tooltip-content='Manage Filters']",

	ChatWindow_MessageBubble: "//div[contains(@class,'chat-message-bubble-content-container')]//span[text()='Hi ']",


	ChatWindow_DataExplorerTab: "//*[@data-tooltip-content='Data Explorer']",

	ChatWindow_DataExplorerHeader: "//*[@class='header-title' and contains(text(),'Data Explorer')]",

	ChatWindow_DataExplorerCancelIcon: "//*[@data-tooltip-content='Close Data Messenger']",

	ChatWindow_DataExplorerFullScreen: "//*[@data-tooltip-content='Full Screen']",

	ChatWindow_DataExplorerTextField: "//*[@class='react-autoql-chatbar-input-container data-explorer ']//input",

	ChatWindow_DataExplorerMessage: "//*[@class='data-explorer-intro-message']//h2[text()='Welcome to ']",


	ChatWindow_QueryResponse: "(//*[contains(@class, 'chat-message-and-rt-container') and contains(@class, 'response')])[2]",



	Project_Dropdown: "//*[@title='Change the selected Project']",

	Project_SportsAlpha: "//*[@class='MuiListItemText-root']//span[text()='Sports Alpha - NHL']",

	Project_ValueEngine: "//*[@class='MuiListItemText-root']//span[text()='ValuEngine']",


	Interpreted_as: "//*[contains(text(), ' Interpreted as: ')]",


	DM_ChatMessage_resp_Table: "//*[@data-test='chat-message']",
	

	DM_ChatMessage_LeftTooptip: "//*[contains(@class,'chat-message-toolbar left react-autoql-toolbar viz-toolbar')]",
	
	DM_ChatMessage_RightTooptip: "//*[@data-test='autoql-options-toolbar']",

	
	
	 DM_response_table: "//div[contains(@class,'react-autoql-response-content-container')]",
	
	DM_response_Tableicon: "//*[@data-tooltip-html='Table']",
	ChatWindow_PivotView: "//*[@data-tooltip-html='Pivot View']" ,

	DM_response_Column_Chart: "//*[@data-tooltip-html='Column Chart']",
	DM_response_ColumnChartToolTip: "Column Chart",
	
	DM_response_Bar_Chart: "//*[@data-tooltip-html='Bar Chart']",
	DM_response_BarChartToolTip: "Bar Chart",
	
	DM_response_Line_Chart: "//*[@data-tooltip-html='Line Chart']",
	DM_response_LineChartToolTip: "Line Chart",
	
	DM_response_Pie_Chart: "//*[@data-tooltip-html='Pie Chart']",
	DM_response_PieChartToolTip: "Pie Chart",
	
	DM_response_Stacked_Bar_Chart: "//*[@data-tooltip-html='Stacked Bar Chart']",
	DM_response_StackedBarChartToolTip: "Stacked Bar Chart",
	
	DM_response_Stacked_Column_Chart: "//*[@data-tooltip-html='Stacked Column Chart']",
	DM_response_StackedColumnChartToolTip: "Stacked Column Chart",
	
	DM_response_Column_Line_Combo_Chart: "//*[@data-tooltip-html='Column Line Combo Chart']",
	DM_response_ColumnLineChartToolTip: "Column Line Combo Chart",
	
	DM_response_Histogram: "//*[@data-tooltip-html='Histogram']",
	DM_response_HistogramToolTip: "Histogram",
	
	DM_response_Scatterplot: "//*[@data-tooltip-html='Scatterplot']",
	DM_response_ScatterplotToolTip: "Scatterplot",
	
	DM_response_Pivotview: "//button[@data-tooltip-html='Pivot View']" ,
	DM_response_PivotviewToolTip: "Pivot View",

	DM_pivot_ColGroup: "//*[@class='tabulator-col tabulator-col-group']",
	DM_response_Network_Graph: "//*[@data-tooltip-html='Network Graph']",

	DM_PivotTable_ColGroup: "//*[@role='columngroup']",
	DM_PivotTable_Firstcol: "//*[@class='tabulator-col-group-cols']/div[1]//div[@class='tabulator-col-title']",
	DM_PivotTable_FirstcolSort: "//*[@class='tabulator-col-group-cols']/div[1]//div/div[@class='tabulator-col-sorter']",
	//DM_PivotFrozenColTitle: "(//*[contains(@class,'pivot-category tabulator-frozen tabulator-frozen-left')])[1]",
	DM_PivotFrozenColTitle: "(//*[contains(@class, 'tabulator-frozen-left')])",

	DM_PivotTable_FirstRow: "(//*[contains(@class,'tabulator-cell pivot-category tabulator-frozen tabulator-frozen-left')])[1]",
	DM_PivotTable_FirstGridCell: "((//*[contains(@class,'tabulator-row tabulator-unselectable tabulator-row-odd')])/div[@class='tabulator-cell pivot-category tabulator-frozen tabulator-frozen-left'])[1]/following-sibling::*[@role='gridcell'][1]",

	DM_response_Heatmap: "//*[@data-tooltip-html='Heatmap']" , 
	DM_response_HeatmapToolTip: "Heatmap",
	
	DM_response_Bubble_Chart: "//*[@data-tooltip-html='Bubble Chart']" , 
	DM_response_Bubble_chart_ToolTip: "Bubble Chart",
	


	DM_response_Filter_table: "//*[@data-tooltip-html='Filter table']",
	DM_response_Filter_table_Tooltip: "Filter table",

	DM_response_filterTableData: "//*[@data-tooltip-html='Filter data from table']",
	DM_response_chartsFiltertooltip: "Filter data from table",
	DM_response_HideFilter_table: "//*[@data-tooltip-html='Hide filters']",
	DM_response_HideFilter_table_Tooltip: "Hide filters",

    DM_response_EditTableFilters: "//*[@data-tooltip-html='Edit table filters']",
    DM_response_chartsEditTableFilters: "Edit table filters",

    DM_Toolbar_ShowHide_Columns: "//*[@data-tooltip-html='Show/hide columns']",
	DM_ShowHide_Columns_tooltip: "Show/hide columns",
	
	//RepDM_Tooltip_ShowHide_Columnsort_problem: "//
	DM_response_Report_problem: "//*[@data-tooltip-html='Report a problem']",
	DM_response_Report_problem_tooltip: "Report a problem",

	DM_BarChart_FirstRect: "//*[@data-test='bar-0-2']",


	DM_RT: "//*[@class='react-autoql-reverse-translation']",

	Table_ScrolledRows: "//*[@class='table-row-count']/span",

	// Show hide Icon Tool Tip
	//	ChatWindow_ShowHide: "(//button[@data-tip='Show/hide columns'])[1]" , 
	//	ChatWindow_ShowHideToolTip: "Show/hide columns",
		
	//	ChatWindow_ShowHideBadge: "//*[@class='react-autoql-badge']",
		
		// Download as CSV Tool Tip
		//ChatWindow_ReportAProblem: "(//button[@data-tip='Report a problem'])[1]" , 
		//ChatWindow_ReportAProblemToolTip: "Report a problem",
		
		
	DM_response_Deletedataresponse: "//*[@data-tooltip-html='Delete data response']",
	DM_response_Deleteresp_tooltip: "Delete data response",

	//Add_Column: "//*[@data-tooltip-html='Add Column']",
	DM_response_table_Add_Column: "(//*[@data-tooltip-content='Add Column'])",
	DM_response_tabColumn: "//*[@class='tabulator-col-content']",
	DM_response_tabColumn_Arrow: "//*[@class='tabulator-col-content']/div/div/div",
	
	DM_response_tab_Sorter: "//*/div[@class='tabulator-headers']",
	// Download CSV
		DownloadAsCSV: "//*[contains(text(),'Download as CSV')]",
		FileDownloadSuccess : "//*[contains(text(),'Your file has successfully been downloaded')]",
		
		// Copy Table to Clip board
		ChatWindow_CopyTableToClipboard: "//*[contains(text(),'Copy table to clipboard')]" , 
		
		ChatWindow_CopyGeneratedQueryToClipboard: "//*[contains(text(),' View generated SQL')]" ,

		//Show/hide visibility checkbox
		ShowHideWindow_Visibility: "(//div[contains(text(),'Visibility')]//parent::div/div//input[@type='checkbox'])[1]",
		ShowHideWInodow_columns: "//input[@type='checkbox']",
		//Show/hide visibility Apply
		ShowHideWindow_Apply: "//div[text()='Apply']",
		ChataResponseColumn: "(//*[@class='tabulator-col-content']//*[@class='tabulator-col-title'])[1]",
		DM_RemoveColumn: "//*[@class='context-menu-list']/li[contains(text(), 'Remove Column')]",

		//ChatWindow_MoreOptions: "(//*[@data-tooltip-html='More options'])[1]",
		DM_response_MoreOptions: "(//button[@data-tooltip-html='More options'])",

		ChatWindow_CreateDataAlert: "//li[text()='Create a Data Alert...']",
		CreateDataAlert_Cancel: "//button[1]/div[text()='Cancel']",
		ChatWindow_AddtoDashboard: "//li[text()='Add to Dashboard...']",

		DM_MoreOptionsMenu: "(//*[@class='more-options-menu'])",
		//Invalid Query Messages
		

		ChatWindow_InvalidQuery1: "//*[contains(text(),'not sure what you mean by')]",
		ChatWindow_InvalidQuery2: "//*[contains(text(),'I want to make sure I understood your query. Did you mean:')]",
		ChatWindow_InvalidQuery3: "//*[contains(text(),'Oops! It looks like our system is experiencing an issue. Try querying again. If the problem persists, please send an email to our team at support@chata.ai.')]",
		ChatWindow_InvalidQuery4: "//*[contains(text(),'Unable to execute query')]",
		ChatWindow_InvalidQuery5: "//*[contains(text(),'Internal Service Error: Our system is experiencing an unexpected error')]",
		ChatWindow_InvalidQuery6: "//*[contains(text(),'I need your help matching a term you used to the exact corresponding term in your database.')]",
			
		DM_RunQuery: "//*[text()='Run Query']" ,

		ChataResponseSuggestions: "//*[@class='react-autoql-suggestion-message']",
		ChatWindow_InvalidMsgSuggestionsDeleteIcon: "(//*[@data-tooltip-html='Delete data response'])[2]" ,
		
		Chatdrawer_NoneOfTheseOption: "//*[@class='react-autoql-suggestion-btn' and text()='None of these']",
		ChatWindow_ThanksForYourFeedback: "//*[contains(text(),'Thank you for your feedback')]",
		ChatWindow_ThanksFeedback_DeleteMessage: "(//button[@data-tooltip-html='Delete data response'])[3]" ,
		ChatWindow_DeleteMessageToolTip: "Delete data response",

		//Data Limit Messages
		
		ColumnChart_DisplayLimitWarning: "//*[contains(@class,'react-autoql-chart-data-limit-icon')]",
		ColumnChart_DisplayLimitMessage: "To optimize performance, this chart is limited to the initial 50,000 rows.",

		//ChataSingleResponse: "//*[@class='single-value-response  with-drilldown']",
		SingleValueResponse: "//*[@class='single-value-response  with-drilldown']",
		
		
		//Auto complete Suggestions
		
		ChatWindow_AutoCompleteSuggestions: "//*[@class='react-autosuggest__suggestion']",
		ChatWindow_AutoCompleteFirstValue: "(//*[@class='react-autosuggest__suggestion'])[2]",

		//Filter Table Elements
		DM_response_DateFilterCell: "(//input[@placeholder='Pick range'])",
		DM_response_DatePickerTable: "//*[@class='react-autoql-popover-date-picker']",
		DM_response_DateApply: "//button/div[contains(text(), 'Apply')]",
		
		DM_response_FilterCell: "(//input[@placeholder='Filter'])" ,
		DM_responseTable_gridcell: "(//div[@role='row']/div[@role='gridcell'])",
		DM_responseTableRows: "//*[@class='tabulator-table']/div[@role='row']",
		DM_responseClearFilter: "//*/div[@class='tabulator-headers']",
		DM_response_rowsVisible : "//*[@class=\"table-row-count\"]/span",

		DM_NomatchingDataResp: "//*[contains(@class,'table-loader')]/div",
		//DM_responseTableRows: "(//*[@class='tabulator-header-contents'])[2]//div[@role='row']",
		DM_responseTableColumns: "//*[@class='tabulator-col-title-holder']" ,
		 DM_Filtercol2Inputtype: "(//*[@class='tabulator-col-content'])[2]/div[2]/input",
		DM_Col2Name: "(//*[@class='tabulator-col-content'])[2]/div/div",
		DM_TableColumn: "//*[@class='tabulator-col-title']",
		DM_columnHeaders: "//*[contains(@class,'tabulator-headers')]",
		
		DM_responseSecondColumn: "(//div[@class='tabulator-col-title'])[2]",


		//Show Hide columns
		//ShowHideWindow_FirstColumnName: "(//*[@class='react-autoql-list-item']/div)[1]",
		showHideWindow_FirstColumnName: "//*[contains(@class, 'react-autoql-list-item')][1]",
		ShowHideWindow_FirstCheckbox: "(//*[contains(@class, 'react-autoql-list-item')][1]/div/div/div/input[@type='checkbox'])",

		ShowHideWindow_ErrorMessage: "//*[@class='no-columns-error-message']",
		ShowHideWindow_ErrorMessageOnEmptyApply: "All columns in this table are currently hidden. You can adjust your column visibility preferences using the Column Visibility Manager",

		ShowHideWindow_Title: "//*[@class='react-autoql-modal-header' and contains(text(),'Show/Hide Columns')]" ,
		ShowHideWindow_Cancel: "//button/div[contains(text(),'Cancel')]",
		ShowHideWindow_CloseIcon: "//*[@class='react-autoql-modal-header']/span",
		
		//DrillDown 

		DM_Drilldown_RightToolBar: "(//*[@data-test='autoql-options-toolbar'])[2]",
		DM_ResponseTable_Cells: "(//*[@class='tabulator-table']//div[@role='row']/*[@role='gridcell'])",
		DM_DrillDown_NoDataFound: "//*[contains(text(),'No Data Found')]",
		DM_DrillDownResponse: "(//*[@data-test='query-response-wrapper'])[2]" , 
		DM_DrillDownResponseTable: "(//*[@data-test='query-response-wrapper'])[2]",

		DM_DrillDown_FiterTable: "(//*[@data-tooltip-html='Filter table'])[2]" , 
		DM_DrillDown_ShowHide: "(//*[@data-tooltip-html='Show/hide columns'])[2]" , 
			
		
		DM_DrillDown_ReportAProblem: "(//*[@data-tooltip-html='Report a problem'])[2]" , 
		DM_DrillDown_DeleteMessage: "(//*[@data-tooltip-html='Delete data response'])[2]" ,
		DM_DrillDown_MoreOptions: "(//*[@data-tooltip-html='More options'])[2]" , 
		DM_MoreOptionsToolTip: "More options",

		DM_DrillDown_DownloadAsCSV: "//*[contains(text(),'Download as CSV')]",
		DM_DrillDown_CopyTableToClipboard: "//*[contains(text(),'Copy table to clipboard')]" , 
		DM_DrillDownResponseTableColumns: "(//*[@data-test='query-response-wrapper'])[2]//div[@role='columnheader']" ,
		//DM_DrillDown_QueryResponseRows: "(//*[@data-test='query-response-wrapper'])[2]//div[@role='row']",
		
		DM_DrillDown_QueryResponseRows: "(//*[@data-test='query-response-wrapper'])[2]//div[@role='row']",
		DM_Drilldown_QueryResponseFirstColumn: "(//*[@data-test='query-response-wrapper'])[2]//div[@role='columnheader'][1]",
		ChatWindow_ShowHide: "(//button[@data-tooltip-html='Show/hide columns'])[1]" , 
		ChatWindow_ShowHideToolTip: "Show/hide columns",
		//ChatWindow_DrillDown_ReportAProblem: "(//*[@data-tip='Report a problem'])[2]" , 
		DM_StackedBarChartData: "//*[@class='column' and @x>0 and @y>0]" ,

		DM_responsetable_FirstcolumnSorter: "//*[@class='tabulator-headers'][1]/div[1]/div/div/div[@class='tabulator-col-sorter']",
		DM_responseTable_FirstcolumnSorter: "//*[contains(@class, \"tabulator-col-sorter-element\")][1]",
		
		DM_responseTable_FirstColumnHeader: "(//*[@class='tabulator-col-title'])[2]",


		//Filter Locking
		DM_Manage_Filters: "//button[@data-tooltip-content='Manage Filters']",
		DM_Delete_FilterLock: "//*[@data-tooltip-content='Remove filter']",
		DM_FilterLock_menuContent: "//*[@class='filter-lock-menu-content']",
		DM_FilterLock_close: "//button[contains(@class, 'filter-locking-close-btn')]",
		DM_FilterLock_input: "//input[@class='react-autoql-vl-autocomplete-input']",
		DM_FL_FirstSuggestion: "//*[contains(@class,'react-autosuggest__suggestions-list')]/li[1]",

		DM_FL_FilterText: "//*[contains(@class,'react-autoql-filter-list-item-filter')]",

		DM_FL_Include: "//div[text()='INCLUDE']",
		DM_FL_Exclude: "//div[text()='EXCLUDE']",
		DM_FL_Badge: "//*[@class='react-autoql-filter-lock-icon-badge']",
		DM_RT_text: "//*[@class='chat-message-rt-container']",
		DM_Drilldown_RT_text: "(//*[@class='chat-message-rt-container'])[2]",

	DM_FL_persistToggle: "//*[contains(@class,'react-autoql-checkbox--switch__input')]",
		DM_FL_emptyFilterMesg: "//*[contains(text(), 'No Filters are locked yet')]",

		DM_FilterIconBadge: "//*[@class='react-autoql-badge']",
		//Data Explorer Locators after this line

		DE_headerTitle: "//*[@class='header-title' and contains(text(),'Data Explorer')]",

		//ChatWindow_WaterMark: "//*[@class='watermark']",
		DE_widgetTab: "//*[@data-tooltip-content='Data Explorer']",
		DE_welcomeMessagee: "//*[@class='intro-message-title' and contains(@text(),'Data Explorer')]",

		DE_searchBar: "//input[@class='react-autoql-chatbar-input']",
		DE_autoSuggestionsContainer: "//*[contains(@class,'react-autosuggest__suggestions-container')]",
		DE_ClearHistory: "//*[contains(text(),'Clear history')]",

		DE_suggestion: "//*[@class='react-autosuggest__suggestions-list']/li[1]",
		DE_submitQuery: "//*[@data-tooltip-content='Submit Query']",

		DE_topicText: "//*[contains(@class,'react-autoql-data-explorer-selected-subject-title')]/span",
		DE_sampleQueryFields: "//*[@class='react-autoql-multi-select-text']",
		DE_DateField: "//*[@class='react-autoql-menu ']/div[1]/div[2]",
		DE_DuckingTimeEdit: "//*[contains(@class, 'DUCKLING_TIME')]",
		DE_selectField: "//*[@class='react-autoql-menu ']/div[3]/div/div",
		DE_datePicker: "//*[contains(@class,'date-picker-btn')]",
		DE_date1: "//*[contains(@class, 'rdrDayStartOfMonth')]",
		DE_date7: "//*[@class='rdrDays']/button[7]",
		DE_DateApply: "//button/div[contains(text(), 'Apply')]",
		DE_MonthPicker: "//*[@class='rdrMonthPicker']",
		DE_pickFirstMonth: "//*[@class='rdrMonthPicker']/select/option[1]",

		DE_tableCell: "//*[@class='selectable-table-row'][1]/td[3]",
		DE_editField: "//*[@class='react-auoql-inline-number-editor-wrapper']/div",
		DE_sampleFieldVal: "//*[@class='data-explorer-sample-chunk data-explorer-sample-chunk-VL']",

		DE_searchColValue: "//input[@class='react-autoql-vl-autocomplete-input']",
		DE_firstAutosuggestion: "//*[contains(@class,'react-autosuggest__section-container')]/ul/li[1]",
		DE_samplequeryVL: "//*[contains(@class,'sample-chunk-VL')]/div",
		DE_search_FirstSuggestion: "//*[contains(@class,'react-autosuggest__suggestions-list')]/li[1]",

		DM_noDataMatching: "//*[contains(text(), 'No data matching your')] ",
	//Chart Elements
	DM_AllcolumnsHiddenMesg: "//*[contains(text(), 'All columns in this table are currently hidden. You can adjust your column visibility preferences using the Column Visibility Manager')]",

	DM_charts_xaxisTitle: "//*[@class='x-axis-label']/*[local-name()='tspan']/*[local-name()='tspan'][1]",
	//DM_XaxisLegend: "//*[@class='x-axis-label']",
	DM_xaxisLegend: "//*[local-name()='rect'][@class='axis-label-border ']",
	DM_yaxisLegned: "(//*[local-name()='rect'][@class='axis-label-border '])[2]",

	DM_charts_yaxisTitle: "//*[@class='left-axis-title']/*[local-name()='tspan']/*[local-name()='tspan'][1]",

	DM_CC_yAxisLegend: "//*[@class='left-axis-title']/*[local-name()='tspan']",
	DM_CC_xaxisSelector: "//*[@class='axis-selector-container']/ul/li",
	DM_CC_YaxisTitle: "//*[local-name()='g']//*[@class='left-axis-title']/parent::*[local-name()='g']",
	DM_BC_XaxisTitle: "//*[local-name()='g']//*[@class='x-axis-label']/parent::*[local-name()='g']",

	DM_YaxisLegendselector: "//*[@class='legend-selector-container']/div/ul/li",
	DM_CC_AggrColVal: "//*[@class='agg-selector-column-item']/div/span",

	LegendFilterSelectAllCbox: "//span[text()='Select All']/preceding-sibling::div//input",
	LegendSortBtn: "//*[contains(@class,'legend-sort-button')]",
	LegendFilterCBox: "(//div[contains(@class, 'legend-popover-content')]//div[contains(@class, 'legend-item')]//input[@type='checkbox'])",
	DM_CC_GoalsChekcbox: "//*[contains(@class, 'agg-select-text') and contains(.., 'Goals')]/parent::div/parent::div/parent::div/div[2]/div/div/input",
	//DM_CC_xaxis: "//*[@class='axis-selector-content']",
	LegendFilterApply: "//button[text()='Apply']",
	DMcharts_ApplyField: "//div[text()='Apply']",
	ChartvisibleLegend: "//*[local-name()='g' and contains(@class, 'cell') and contains(@class, 'visible')]//*[local-name()='text']/*[local-name()='tspan']",
DM_CC_AggrAvg: "//*[contains(@data-tooltip-html,'Average')]",

DM_LeftToolbar_Buttons: "//*[contains(@class, 'chat-message-toolbar left')]//button",

DM_Charts_DownloadasPNG: "//*[contains(text(),'Download as PNG')]",

DM_Charts_delete_downloadedMessage: "(//*[@data-tooltip-html='Delete data response'])[2]",

DM_Charts_downloadSuccess: "(//*[@class='chat-message-bubble-content-container'])[3]",

DM_lastresponse: "(//*[@data-test='autoql-options-toolbar'])[2]",
firstLegend: "(//*[@class='label'])[1]",
secondLegend: "(//*[@class='label'])[2]",
Charts_axisLabel: "//*[@data-test='legend-title']",
AssistsColXpath: "(//*[contains(@class, 'tabulator-col-title') and text()='Assists'])[2]",

	DM_SingleResponseValue: "//*[@class='single-value-response  with-drilldown']",

	CreateNewDBFromDM: "//*[text()='Create New Dashboard']",
	NewDB_radioButton: "//input[@value='new-dashboard']",
	AddNewDatasettoDB: "//span[text()='Add to Dashboard']",

	Table_CustomButton: "//*[@class='more-options-menu react-autoql-add-column-menu']/ul/li[contains(text(), 'Custom')]",
	CustomColwindowTitle: "//*[@class='react-autoql-modal-header-title']",
	CustomColName: "//input[@label='Column Name']",
	CustomCol_PofTButton: "//button/div[contains(text(),'Percent of Total')]",
	CustomCol_RankButton: "//button/div[contains(text(),'Rank')]",

	Customcol_PofTText: "PERCENT OF TOTAL",
	Customcol_TotalPofT: "Total % of Column *",
	Customcol_PartitionByCol: "Partition By Column",

	Customcol_TotalPofTDropdown: "//div[contains(., 'Total % of Column')]/parent::div//span[@class='react-autoql-select-text-placeholder']",
	Customcol_TotalPofT_DD_ele1: "//div[contains(@class, 'popover-container-content')]//li[1]//span[2]",

	Customcol_PopOverContainerEle2: "//div[contains(@class, 'popover-container-content')]//li[2]//span[2]",
	Customcol_PartitionByDropdown: "//div[text()='Partition By Column']/following-sibling::div[@data-test='react-autoql-select']",
	Customcol_PartitionPofT_DD_ele1: "//div[contains(@class, 'popover-container-content')]//li[1]//span[2]",
	Customcol_OrderbyDropdown: "//div[text()='Order By Column *']/following-sibling::div[@data-test='react-autoql-select']",
    Customcol_OrderbyDirection: "//div[text()='Order By Direction']/following-sibling::div[@data-test='react-autoql-select']",

    Customcol_popover: "//div[contains(@class, 'popover-container-content')]//li/div/span[2]",
	CustomCol_AddFunction: "//button/div[contains(text(),'Add Function')]",
	CustomColFormula_Container: "//div[contains(@class, 'react-autoql-formula-builder-container')]",
	CustomColFormula_part1: "//*[@class='react-autoql-operator-select-wrapper']/span/span",
	CustomColFormula_part2: "//*[@class='react-autoql-menu-item-value-title']/span[2]",
	CustomColFormula_PartitionbyCol: "//span[contains(text(), 'Partition By')]/following-sibling::div//span[@class='react-autoql-menu-item-value-title']/span[last()]",
	CustomcolFormula_ClearAll: "//*[text()='Clear All']",
	CustomcolFormula_valid: "//*[contains(@class, 'formula-builder-validation-message-success')][contains(text(), 'Valid')]",
	CustomCol_SaveColumn: "//button/div[contains(text(),'Save Column')]",





    
};

export class DMPage {
    constructor(private page: Page) {}

    get dmIcon() {
        return this.page.locator(DMpage_Locators.dmIcon);
    }

    get dmTitle() {
        return this.page.locator(DMpage_Locators.dmTitle);
    }

    get dmQueryInput() {
        return this.page.locator(DMpage_Locators.dmQueryInput);
    }

    get dmQuerySendBtn() {
        return this.page.locator(DMpage_Locators.dmQuerySendBtn);
    }

    get dmResponseTable() {
        return this.page.locator(DMpage_Locators.dmResponseTable);
    }

    get dmResponseTableMoreOptions() {
        return this.page.locator(DMpage_Locators.dmResponseTableMoreOptions);
    }

    get dmResponseTableAddToDashboardOption() {
        return this.page.locator(DMpage_Locators.dmResponseTableAddToDashboardOption);
    }
    
    get filterResponseTable() {
        return this.page.locator(DMpage_Locators.DM_response_Filter_table);
    }
    get DM_response_table_Add_Column(){
        return this.page.locator(DMpage_Locators.DM_response_table_Add_Column);
    }
    get Table_CustomButton(){
        return this.page.locator(DMpage_Locators.Table_CustomButton);
    }
    get customColWindowTitle() {
    return this.page.locator(DMpage_Locators.CustomColwindowTitle);
}
    get CustomCol_RankButton() {
    return this.page.locator(DMpage_Locators.CustomCol_RankButton);
}
get PartitionByDropdown() {
    return this.page.locator(DMpage_Locators.Customcol_PartitionByDropdown);
}

get OrderbyDropdown() {
    return this.page.locator(DMpage_Locators.Customcol_OrderbyDropdown);
}

get OrderbyDirection() {
    return this.page.locator(DMpage_Locators.Customcol_OrderbyDirection);
}
get partitionByDropdown() {
    return this.page.locator('.react-autoql-select-and-label:has-text("Partition By Column") .react-autoql-select');
}
 get CustomCol_AddFunction() {
    return this.page.locator(DMpage_Locators.CustomCol_AddFunction);
}

 get CustomCol_SaveColumn() {
    return this.page.locator(DMpage_Locators.CustomCol_SaveColumn);
}

 get customColumnNameInput() {
        return this.page.locator(DMpage_Locators.CustomColName);
    }
get CustomColFormula_Container() {
        return this.page.locator(DMpage_Locators.CustomColFormula_Container);
    }

    
    get ShowHide_Columns() {
        return this.page.locator(DMpage_Locators.DM_Toolbar_ShowHide_Columns);
    }

  get ShowHide_Visibility() {
    // 1. Find the parent container that contains the text 'Visibility'
    // 2. Find the checkbox within that specific container
    return this.page
        .locator('div', { hasText: 'Visibility' })
        .locator('input[type="checkbox"]')
        .first(); // Explicitly take the first one found in that container
}
    

 get ShowHideWindow_Apply() {
        return this.page.locator(DMpage_Locators.ShowHideWindow_Apply);
    }

}       