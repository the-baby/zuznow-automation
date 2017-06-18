		<?php
		global $user;
		if (empty($user->name))
		{
		drupal_goto("user/login");
		}
		?>

		<style>
			h3{
				font-weight: bold;
			}
			.WordSection1.floating-menu-container{
				width: 100%;
			}
			img{
				max-width: 100%;
			}
			table.sdk-table{
				font-family: 'Open Sans', sans-serif;
				font-size: 13px;
			}
			table.sdk-table p{
				margin-bottom: 5px;		
			}
			table.sdk-table th, table.sdk-table td{
				padding: 8px;
				padding-left: 25px;
				padding-right: 25px;
			}
			table.sdk-table thead th{
				border: 1px solid #ddd !important;
				font-weight: bold;
			}
			table.sdk-table tbody tr{
				background-color: #fff;
			}
			table.sdk-table tbody tr.odd td{
				background: #f9f9f9;
			}
			roundImage{
				border-radius:10px;
			}
		</style>

		<div class="panel">
			<div class="panel-heading">
				<i class="fa fa-question"></i>
				<span>dashboard system description</span>
			</div>
									
						<h3>About This Document</h3>
						<div>
						<p class=MsoNormal>
                        The Dashboard System Description is for developers and administrators who are creating, configuring and managing apps with voice assistants. 
						Divided into chapters according to the Dashboard main menu, it describes the purpose and, where relevant, valid inputs for fields on Dashboard pages and subpages.						
						</div>
						
							</p>
						<h3>Login</h3>
						<div>	
						<p class=MsoNormal>
								Access the Dashboard through a web browser at the link provided, e.g., <a href="https://dashboard-beta.conversation.one/user/login?destination=node/">https://dashboard-beta.conversation.one/user/login?destination=node</a> <br>
								The following Log in screen appears:
							</p>
							
													
												
							
							<img width= 350 src="/systemdescription_files/Conversation/LogIn Conv.jpg">
							
							<p class=MsoCaption><a name="_Ref364776878">Figure </a>: Log in screen</p>
							<p>
							Enter your Dashboard username and password or use your Google account to Log in <br>
							Forgot your password? To request a new password, click on the <i>Forgot your Password</i>, enter your e-mail address, and click <i>E-mail new password</i>. You will receive a link that provides you with a one-time login to the Dashboard, where you can change your password.
							<br>
							Click on the <i>Create account</i> link if you don’t have an account. Enter your first and last name, and an e-mail address, then click <i>Create new account</i>. You will get a link. Use it to log in to the dashboard and set your password.

							<p>
						</div>

						<h3>Dashboard Home Page</h3>
						<div>
                        <p class='MsoNormal' style='page-break-after:avoid'>
								Upon logging in, the Dashboard home page appears:
							</p>
							
							<p class="MsoNoSpacing">
								<img border=0 class="roundImage" width = "810" src="/systemdescription_files/Conversation/HomePage.jpg">
							</p>
							
							<p class="MsoCaption"><a name="_Ref364776878">Figure </a>: Dashboard Home Page</p> 
							
                            <p class="MsoNormal">
								From the Dashboard side menu you can access all functions.
								The dashboard side menu is divided into three main categories:
								Dashboard: where you can create a new app, edit an existing app or view your list of apps.
								Documentation: where you can read more about the platform.
								System: where you can manage your servers, versions, users and more. 
							</p>							
						</div>
						
						
						
												
						<h3>New App</h3>
						<div>
						<p class=MsoNoSpacing>
								Select <i>New App</i> in the Dashboard main menu to access the wizard where
								the administrator or developer defines a new app:
							</p>

							<p class=MsoNoSpacing>
								<img border=0 width=350 id="Picture 321"
									 src="/systemdescription_files/Conversation/NewApp.jpg">
							</p>
							

							<p class=MsoCaption><a name="_Ref364776878">Figure </a>: Create New App</p>
							
							<p> Select industry and enter your company name (or start typing and choose the name from the list in case it is included into it). Then click Next twice. 
							Click Customize to edit your new app or Publish to add a new Alexa skill.
						
						</div>
						
						
						
						<h3>Editor</h3>
						<div>
							<p class=MsoNoSpacing>
								Select <i>Editor</i> in the Dashboard main menu to access the Dashboard
								page where the developer views and edits the adaptation rules for a selected
								app. Select the app to be edited from the list of staging sites (by
								default).
							</p>

							<p class=MsoNoSpacing>
								<img border=0 width=810 class="roundImage" id="Picture 293"
									 src="/systemdescription_files/Conversation/Editor.jpg">
							</p>
							<p class=MsoCaption><a name="_Ref364776878">Figure: </a> Editor </p>
							
								<p class=MsoNoSpacing>
								Use the buttons 
								to carry out the following actions in the Editor:
							</p>

							<p class=MsoListBulletCxSpFirst>
								<b>Save</b>: Saves all changes made to the adaptation
								rules.
							</p>
							<p class=MsoListBulletCxSpMiddle>
								<b>Refresh</b>: Clear recent un-saved changes
							</p>
							<p class=MsoListBulletCxSpMiddle>
								<b>Beautify</b>: Beautify source code format
							</p>
							<p class=MsoListBulletCxSpMiddle>
								<b>Export Rules</b>: Export the rules to zip file
							</p>
							<p class=MsoListBulletCxSpMiddle>
								<b>Export Media</b>: Export the media to zip file
							</p>
							<p class=MsoListBulletCxSpMiddle>
								<b>Import Rules</b>: Import rules (zip file)
							</p>
							<!--<p class=MsoListBulletCxSpMiddle>
								<b>Reset</b>: Cancels all changes made to the
								adaptation rules since the last save.
							</p>-->

							<p class=MsoListBulletCxSpMiddle>
								<b>Clear Cache</b>: Clears the cache for
								that app.
							</p>

							<p class=MsoListBulletCxSpMiddle>
								<b>Revisions</b>: Select the revision version
								(by its timestamp) to view the adaptation rules. To revert back to a desired rules revision, click on the Revert revision button. <br>
								The deleted set can be restored by first selecting it from the sets drop-down menu and then reverting one of the revisions.
							</p>

							<p class=MsoListBulletCxSpLast style='margin-bottom:0in;margin-bottom:.0001pt'>
								<b>Publish</b>:
								Copies the rules to the production site, clears the production site cache, and copies various configurations to the production site.
							</p>
							<p class=MsoListBulletCxSpLast style='margin-bottom:0in;margin-bottom:.0001pt'>
								<b>Publish Alexa Skill</b>:
								Opens a step-by-step wizard to help you set up your Alexa skill.
							</p>
							<br>
							<p class=MsoListBulletCxSpMiddle>
								<b>Sets</b>: Show / Hide rules sets selection
							</p>
							<p class=MsoListBulletCxSpMiddle>
								<b>Add Rules Set</b>: Add new rules set
							</p>
							<!--<p class=MsoListBulletCxSpMiddle>
								<b>Smartphone</b>: 
							</p>
							<p class=MsoListBulletCxSpMiddle>
								<b>Website</b>: 
							</p>-->
							<p class=MsoListBulletCxSpMiddle>
								<b>Show Simulator</b>: Show / Hide simulator view
							</p>
							<br>
						</div>
							<h4>Editor tabs</h4>
							
							<div>							
						<p>The scripts for the selected domain are managed in the Editor tabs on the left. <br><br>
						
						<font size="3 px">Interaction (Graphic Editor)</font size="3px">
						<p><b>Graphic Editor</b> is used to create new intents, add sample phrases to invoke these intents, edit assistant’s response and re-prompt messages. <br>
						It also allows adding custom entities for users to provide their input.</p>

						<p class=MsoNoSpacing>
								<img border=0 width=700 id="Picture 293"
									 src="/systemdescription_files/Conversation/Interaction Editor.jpg">
							</p>
							<p class=MsoCaption><a name="_Ref364776878">Figure </a>: Interaction tab</p>
					
					    <p>An <i>intent</i> represents an action that fulfills a user’s spoken request.</p><br>
						<p>If you want to create a new intent, first type the name and then click on the Add button. The intent will be added to the list.</p>
						
						<p class=MsoNoSpacing>
								<img border=0 width=810 id="Picture 293"
									 src="/systemdescription_files/Conversation/Create Intent.jpg">
							</p>
							<p class=MsoCaption><a name="_Ref364776878">Figure </a>: Add intent</p>

                       <p>  The name of the intent can later be edited by clicking on the Edit sign.</p>
					   
                    	<p class=MsoNoSpacing>
								<img border=0 width=270 id="Picture 293"
									 src="/systemdescription_files/Conversation/Edit intent name.jpg">
							</p>
							<p class=MsoCaption><a name="_Ref364776878">Figure </a>: Edit Intent Name</p>
							
							<p>The list of intents depends on the industry selected for the skill: e.g. banking will have such intents as balance, transactions, transfers, etc.</p>
							<p>It is possible to change the order of intents. Click on the <img border=0 width=45 id="Picture 293"
									 src="/systemdescription_files/Conversation/Reorder.jpg"> sign and then drag and drop the intent you want to move. </p>
 
                         <p> Open the Intent to be able to add sample sentences, entities and responses or edit the existing ones.</p>
						 
						 <p class=MsoNoSpacing>
								<img border=0 width=800 id="Picture 293"
									 src="/systemdescription_files/Conversation/Intent inside.jpg">
							</p>
							<p class=MsoCaption><a name="_Ref364776878">Figure </a>: Intent</p>
						 
						<p> <i>A sample sentence</i> is a phrase said by the user to invoke an intent. Click on the Add button to create new sample sentences. <br>
						The sentences created before can be edited or deleted.</p>
						

						  <p class=MsoNoSpacing>
								<img border=0 width=580 id="Picture 293"
									 src="/systemdescription_files/Conversation/Edit sample phrase.jpg">
							</p>
						<p>	Note that an utterance can contain only unicode characters, spaces and valid punctuation marks. <br>Valid punctuation marks are periods for abbreviations, underscores, possessive apostrophes, and hyphens.<br><br>

                       <i> Entities </i>are divided to custom and predefined.<br>
                        Custom entities - a representative list of possible values for an entity. Custom entities are used for lists of items that are not pre-integrated.<br>
 
                        Predefined entities are those already integrated in conversation.one.</p>
						
					<p>For example, a skill called My Bank has an intent Transactions with such entities as ‘date’ and ‘type’. <br>
						A user can say: What were the transactions on the first of May on my savings account?<br><br>
 
                      You can always create a new entity and delete the existing one.</p>
					  
					  						  					  
                    <p><i> Response</i> - text spoken back to a user as an answer to their request. It can also include a card to be displayed in Alexa app ( a card usually contains text and optionally an image).<br>
                     The text can be static or dynamically defined by a function.</p>

                            <p class=MsoNoSpacing>
								<img border=0 width=500 id="Picture 293"
									 src="/systemdescription_files/Conversation/Response.jpg">
							</p>
							
							<p>The state of the End Session checkbox indicates whether a session should close after the assistant’s response or remain open.</p><br>
							<p>Reprompt text is needed when a session continues, but the user doesn’t say anything. <br>
							Here is an example of a reprompt sentence: ‘is there anything else I can do for you?”.</p><br>
							
							<p>Each intent can be disabled or deleted. A disabled intent will still be present in the editor list, but it will not appear in the Interaction model while publishing the flow.</p>


					        <p class=MsoNoSpacing>
								<img border=0 width=280 id="Picture 293"
									 src="/systemdescription_files/Conversation/Disable intent.jpg">
							</p>
							
					   <i><p> The Manage entities</i> section contains entity types that define how the data in the entity is organized and handled,  list of entity values and list of intents that use the given entity type.</p>

					 <p class=MsoNoSpacing>
								<img border=0 width=800 id="Picture 293"
									 src="/systemdescription_files/Conversation/Manage entities closed.jpg">
							</p><br>
							<p>You need to click on the Entity type field to open the lists of values and intents. It is possible to add and delete entity types and values.</p>
							
                      <p class=MsoNoSpacing>
								<img border=0 width=900 id="Picture 293"
									 src="/systemdescription_files/Conversation/Manage entities.jpg"><br>
					            
								<p><font size="3 px">Business Logic</font size="3px"><br>
							
						This tab contains additional code that can be used as intent response.</p><br>
						
						<p><font size="3 px">API's</font size="3px"><br>
						
						The tab allows generating APIs from exisitng web applications.</p> <br>
						
						<p><font size="3 px">Authorization</font size="3px"><br>
						
						The tab allows designing a log in page for account linking.</p> <br>
						
							
						<p><font size="3 px">Media</font size="3px"><br>
							
						The tab allows uploading different file types that can later be used in the Authorization tab.</p><br>
					
						
						<h4><a name="_Toc368577720">Find</a></h4>
							
							<p class=MsoListBulletCxSpMiddle>
								<span style='font-family:Symbol'>
									·<span style='font:7.0pt "Times New Roman"'>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</span>
								</span><span dir=LTR></span> In the editor tab, click the find button to search for text in your app. 
								
							</p>
							
							<p class=MsoNoSpacing>
								<img border=0 width=800 id="Picture 293"
									 src="/systemdescription_files/Conversation/Find button.jpg">
							</p>
							<p class=MsoListBulletCxSpMiddle>
								<span style='font-family:Symbol'>
									·<span style='font:7.0pt "Times New Roman"'>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</span>
								</span><span dir=LTR></span> Write the desired text to be found. 
								
							</p>
							<p class=MsoListBulletCxSpMiddle>
								<span style='font-family:Symbol'>
									·<span style='font:7.0pt "Times New Roman"'>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</span>
								</span><span dir=LTR></span> Choose search in <i>current set</i> or <i>all sets</i> (examples below). 
								
							</p>
							<p class=MsoNoSpacing>
								<img border=0 width=420 id="Picture 293"
									 src="/systemdescription_files/Conversation/Find in Current set.jpg">
								<img border=0 width=420 id="Picture 293"
									 src="/systemdescription_files/Conversation/Find in all sets.jpg">
							</p>
							
							<br>
							<h4><a name="_Toc368577720">Replace</a></h4>
							
							<p class=MsoListBulletCxSpMiddle>
								<span style='font-family:Symbol'>
									·<span style='font:7.0pt "Times New Roman"'>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</span>
								</span><span dir=LTR></span> In the find/replace box click the replace tab to replace text in your app. 
								
							</p>
							
							<p class=MsoNoSpacing>
								<img border=0 width=420 id="Picture 293"
									 src="/systemdescription_files/Conversation/Replace.jpg">
							</p>
							
							<p class=MsoListBulletCxSpMiddle>
								<span style='font-family:Symbol'>
									·<span style='font:7.0pt "Times New Roman"'>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</span>
								</span><span dir=LTR></span> Write the desired text to be replaced. 
								
							</p>
							<p class=MsoListBulletCxSpMiddle>
								<span style='font-family:Symbol'>
									·<span style='font:7.0pt "Times New Roman"'>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</span>
								</span><span dir=LTR></span> Write the new text that you want to put. 
								
							</p>
							<p class=MsoListBulletCxSpMiddle>
								<span style='font-family:Symbol'>
									·<span style='font:7.0pt "Times New Roman"'>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</span>
								</span><span dir=LTR></span> Mark the specific result you want to replace and click <i>Replace</i> or press <i>Replace all</i> to replace all results.
								
							</p>
							<br>
						</div>
						
						<h3>My Apps</h3>
						
						<div>
							<h4><a name="_Toc368577711">My Apps Home Page</a></h4>

							<p class=MsoNoSpacing>
								Select <i>My Apps</i> in the Dashboard main menu to access the My Apps home page:
							</p>
							<p class=MsoNoSpacing>
								<img border=0 width=810 id="Picture 293"
									 src="/systemdescription_files/Conversation/MyApps.jpg">
							</p>
							<p class=MsoCaption><a name="_Ref364776878">Figure </a>: My apps</p>
														
							<p class=MsoNoSpacing>
								 My Apps tab provides access to the following app parameters:
								<p><b>General</b>: App parameters that are common to both the Staging app and the Production app.</p>
								<p><b>Production</b>: app parameters that are unique to the Production app, i.e., the app that is published and accessible to end-users.</p>
								<p><b>Staging</b>: app parameters that are unique to the Staging app, i.e., an internal app that is under development and available only to developers.</p> <br>
								
								<p>Other actions you can perform in the current tab: </p>
								
								<p><b>Save</b>: You must click this button in order to save changes made in the App Manager.</p>
								<p><b>Clear Cache</b>: We recommend clearing an app’s cache after editing apps parameters (as explained below), after changing the Dashboard version, or upon any kind of malfunction in the app..</p>
								<p><b>Edit</b>: Go to the <i>Edit app</i> page.</p>
								<p><b>Delete</b>: Permanently delete the app.</p>
								<p><b>Export</b>: Export scripts and sets to a file.</p>
								<p><b>Import</b>: Import previously exported scripts and sets.</p>
							</p>
							
							</div> <br>
						
						<div>
							<h4><a name="_Toc368577711">General Parametres</a></h4>

							
							<p class=MsoNoSpacing>
								<img border=0 width=810 id="Picture 293"
									 src="/systemdescription_files/Conversation/Configuration general.jpg">
							</p>
							<p class=MsoCaption><a name="_Ref364776878">Figure </a>: General tab</p>
														
							<br>
							
							<h4>Features</h4>
							
							<p>
								The following app parameters appear in the Features section of the General parameters tab: </p>
								<p><b>Use as master</b>: If checked, the rules can be inherited to other Apps.</p>
								<p><b>Use as public master</b>: If checked, the corresponding app will appear in the master list when creating a new app, the rules of the "public master" app can be inherited to other Apps.</p><br>
								<h4>Analytics</h4>
								<p>The Analytics section contains the following info: </p>
								<p><b>Analytics ID</b>: site id taken from the Piwik analytics server. Click Remove to delete the id and then the Add button to automatically generate a new domain in the Piwik analytics system.<br>
									If you already know your site id you can edit it manually.<br>
								<p><b>Add default tracking code:</b> If checked, automatically adds a tracking code to each page of a site. <br>

							   <p> Both features (Analytics ID and Add default tracking code) are available only for admin users. </p><br>
							   
							   <h4>Information</h4>
							<p class=MsoNoSpacing>
								<img border=0 width=500 id="Picture 293"
									 src="/systemdescription_files/Conversation/Information.jpg">
							</p>
							<p class=MsoCaption><a name="_Ref364776878">Figure: </a>Information</p>
							<p>
								The following app parameters appear in the Information section of the General parameters tab:
								<p><b>App ID</b>: Automatically generated when the app was created</p> 
							
								<p><b>Last update</b>: Automatically generated when the app was last updated</p>
								
							</p> <br>
							   
							   <h4>Permissions</h4>
							<p class=MsoNoSpacing>
								<img border=0 width=500 id="Picture 293"
									 src="/systemdescription_files/Conversation/Permissions.jpg">
							</p>
							<p class=MsoCaption><a name="_Ref364776878">Figure </a>: Permissions</p>
							<p>
								<p>Click the Single <i>New Permission</i> or <i>the Group New Permission</i> button to add a User/ Usres’ Group drop-down.</p>
								<p>Select from the drop-down list the relevant user or group.</p>
								<p>Click the Save button to save changes.</p>
							</p>
						</div>
                      <h3>Production</h3>
						<div>
							<p class=MsoNoSpacing>
								When you select the Production tab in the App Manager, the following page appears:
							</p>
							<p class=MsoNoSpacing>
								<img border=0 width=721 height=400  id="Picture 323" class="roundImage"
									 src="/systemdescription_files/Conversation/Production.jpg">
							</p>
							<p class=MsoCaption><a name="_Ref364776878">Figure: </a>Settings</p>
							<p>
								<br>
								<p>The following Production App parameters are controlled in the Settings section:</p>
								<p><b>Name</b>: By default this will be the App name specified when the app was created.</p>
								<p><b>Master</b>: Select from the drop-down list all of the apps whose customization rules have been made available for inheritance.</p>
								<br>
						</div>	
                         <h3>Alexa Tab </h3>
						<div>
								<p class=MsoNoSpacing>
								<img border=0 width=721 id="Picture 323"
									 src="/systemdescription_files/Conversation/Alexa production tab.jpg">
								</p>
								<p class=MsoCaption><a name="_Ref364776878">Figure </a>: Alexa tab </p>
								<br>
								<p>The following Production App parameters are defined in the <i>Alexa</i> section:</p>
								<p><b>Alexa suppport</b>: enables Alexa skill.</p>
								<p><b>Account linking</b>: allows integrating your Alexa skills with third-party application.</p>
								<p><b>Redirect URLs</b>: The list of HTTPS redirection endpoints that could be requested during authorization to redirect the user back to after the authorization process.</p>
								<p><b>Client Id</b>: Unique public string used to identify the client requesting for authentication.</p>
								<p><b>Client secret</b>: Unique private string used to identify the client requesting for authentication.</p>
								<p>Client Id and Client secret are generated automatically. </p>
								<br>
						</div>	
                         <h3>Network Tab </h3>
						<div>
								<p class=MsoNoSpacing>
								<img border=0 width=721 id="Picture 323"
									 src="/systemdescription_files/Conversation/Network.jpg">
								</p>
								<p class=MsoCaption><a name="_Ref364776878">Figure </a>: Network tab </p>
								<br>
								<p>A server for your app can be selected in the network tab.</p>
								
								<br>
						</div>	
                         <h3>Staging</h3>
						<div>
						<p class=MsoNormal>
							The fields in the <i>Staging</i> tab are the same as in the <i>Production</i>
							tab, except that they apply to the staging sub-domain, i.e., a sub-domain that
							is used for development.
			
						</p>
						</div>						
			
						<h3>Analytics</h3>
						<div>
							<p class=MsoNoSpacing>
								Select <i>Analytics</i> in the Dashboard main menu 
								to access the Dashboard page 
								that presents a detailed analysis of your data.
							</p>
							<p class=MsoNoSpacing>
								Once an app has been selected, analytics information will be shown.
								<br>Choose an app from the list to view the report. Mind that only published apps will have analytics data. The report contains Intents over time graph and two pie charts. <br> Mouse over the graph to see the exact number of users and intents.
                             <p class=MsoNoSpacing>
								<img border=0 width = 760 id="analytics_p3" class="roundImage"
									 src="/systemdescription_files/Conversation/Analytics.jpg">
									
							<p class=MsoCaption><a name="_Refanalytics1">Figure </a>: Intents over Time report</p>
							<br>
							<p class=MsoNoSpacing>
								You can change the time range presented in the report by selecting one of the options from the drop-down menu on top.<br> Click Custom range to set your own dates.
							</p>
							<p class=MsoNoSpacing>
							<img border=0 width = 600 id="analytics_p1" class="roundImage"
									 src="/systemdescription_files/Conversation/Custom date report.jpg">	
							</p>
							<p class=MsoCaption><a name="_Refanalytics2">Figure </a>: Time range selection</p>
							<br>
								<p class=MsoNoSpacing>
								
								<br>Mouse over the pie charts to see the exact data in percentage.
							</p>
							<p class=MsoNoSpacing>
								<img border=0 width = 800 id="analytics_p4" class="roundImage"
									 src="/systemdescription_files/Conversation/Pie charts.jpg">
							</p>
							<p class=MsoCaption><a name="_Refanalytics4">Figure </a>: Pie charts info</p>
							<br>
							</p>
							</div>
						<h3>Servers</h3>
						<div>
							<p class=MsoNoSpacing>
								Select <i>Servers</i> in the Dashboard main menu to change the name or
								hostname for an existing server, or to provide the same
								parameters for a new server.
							</p> 
                         </div>							
							<h3>Audit Logs</h3>
						<div>
							<p class=MsoNoSpacing style='page-break-after:avoid'>
								
								Select <i>Audit Logs</i>
								in the Dashboard main menu 
								to access a table of all system actions carried out on the Dashboard.
							</p>
							</div>

							
