<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="2.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:waml="http://skitsanos.com/waml/">
	<!--
		Webware Application Markup Language Template
		Skitsanos.com, (c), 2007
	-->
	<!--
	<xsl:include href="waml-box.xslt"/>
	<xsl:include href="waml-button.xslt"/>
	<xsl:include href="waml-contextmenu.xslt"/>
	<xsl:include href="waml-contentcontainer.xslt"/>
	<xsl:include href="waml-flash.xslt"/>
	<xsl:include href="waml-layout.xslt"/>
	<xsl:include href="waml-linkbutton.xslt"/>
	<xsl:include href="waml-menu.xslt"/>
	<xsl:include href="waml-resizable.xslt"/>
	<xsl:include href="waml-roundedbox.xslt"/>
	<xsl:include href="waml-tabs.xslt"/>
	<xsl:include href="waml-window.xslt"/>
	-->
	<!-- WAML -->
	<xsl:output method="xhtml" indent="yes" media-type="text/html" doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" encoding="UTF-8"/>

	<xsl:template match="*|@*">
		<xsl:copy>
			<xsl:copy-of select="@*"/>
			<xsl:apply-templates/>
		</xsl:copy>
	</xsl:template>

	<xsl:template match="a:head[@waml:enabled]" xmlns:a="http://www.w3.org/1999/xhtml">
		<head>
			<link rel="stylesheet" type="text/css" href="waml.css"/>
			<xsl:apply-templates/>
		</head>
	</xsl:template>

	<!-- Includes -->
	<xsl:template match="waml:include">
		<xsl:if test="@type='js'">
			<script type="text/javascript">
				<xsl:attribute name="src">
					<xsl:value-of select="@url"/>
				</xsl:attribute>&#xA0;</script>
		</xsl:if>
		<xsl:if test="@type='css'">
			<link rel="stylesheet" type="text/css">
				<xsl:attribute name="href">
					<xsl:value-of select="@url"/>
				</xsl:attribute>
			</link>
		</xsl:if>
		<xsl:if test="@type='lib'">
			<script type="text/javascript">if (typeof Waml == 'undefined') {alert("Waml.js not loaded. Can't include any library without it.");} else {Waml.Utils.includeJs('<xsl:value-of select="@url"/>');}</script>
		</xsl:if>
	</xsl:template>
	<!--
	Web Form
	-->
	<xsl:template match="waml:webform">
		<form action="javascript:void(0);">
			<xsl:if test="@id">
				<xsl:attribute name="id">
					<xsl:value-of select="@id"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:apply-templates/>
		</form>

		<xsl:if test="@action!=''">
			<script type="text/javascript">var frm = $('<xsl:value-of select="@id"/>');
				Waml.Events.attach($('<xsl:value-of select="@id"/>'), "submit", function(){
					var queryString = "";				
					for(var i = 0; i &lt; frm.elements.length; i++) 
					{
				        if (frm.elements[i].type != "submit")
						{
							queryString += frm.elements[i].id + "=" + encodeURIComponent(frm.elements[i].value)+ "&amp;";								
						}
					}
					if (queryString.endsWith("&amp;"))
					{
						queryString = queryString.slice(0, queryString.length - 1);
					}				
				<xsl:choose>
					<xsl:when test="@result!=''">
						Waml.Utils.loadURL("POST", "<xsl:value-of select="@action"/>", false, <xsl:value-of select="@result"/>, {postData: queryString, headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}<xsl:if test="@fault">, errorCallback: <xsl:value-of select="@fault"/></xsl:if>});
					</xsl:when>
					<xsl:otherwise>
						Waml.Utils.loadURL("POST", "<xsl:value-of select="@action"/>", false, function(req){}, {postData: queryString, headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}<xsl:if test="@fault">, errorCallback: <xsl:value-of select="@fault"/></xsl:if>});
					</xsl:otherwise>
				</xsl:choose>
			});</script>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet><!-- Stylus Studio meta-information - (c) 2004-2007. Progress Software Corporation. All rights reserved.
<metaInformation>
<scenarios ><scenario default="yes" name="Scenario1" userelativepaths="yes" externalpreview="no" url="sample-basic-waml-document.htm" htmlbaseurl="" outputurl="sample-basic-waml-document.html" processortype="saxon8" useresolver="yes" profilemode="0" profiledepth="" profilelength="" urlprofilexml="" commandline="" additionalpath="" additionalclasspath="" postprocessortype="none" postprocesscommandline="" postprocessadditionalpath="" postprocessgeneratedext="" validateoutput="no" validator="internal" customvalidator=""/></scenarios><MapperMetaTag><MapperInfo srcSchemaPathIsRelative="yes" srcSchemaInterpretAsXML="no" destSchemaPath="" destSchemaRoot="" destSchemaPathIsRelative="yes" destSchemaInterpretAsXML="no" ><SourceSchema srcSchemaPath="sample-basic-waml-document.xml" srcSchemaRoot="html" AssociatedInstance="" loaderFunction="document" loaderFunctionUsesURI="no"/></MapperInfo><MapperBlockPosition><template match="*|@*"></template><template match="wa:include"></template></MapperBlockPosition><TemplateContext><template match="*|@*" mode="" srcContextPath="/html/head" srcContextFile="file:///d:/Skitsanos/Skitsanos WAML/waml/sample-basic-waml-document.xml" targetContextPath="" targetContextFile=""/></TemplateContext><MapperFilter side="source"></MapperFilter></MapperMetaTag>
</metaInformation>
-->