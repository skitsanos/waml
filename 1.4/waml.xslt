<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:wa="http://grafeio.eu/waml/" xmlns:spry="http://ns.adobe.com/spry">
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
	<!-- WAML -->
	<xsl:output omit-xml-declaration="yes" encoding="UTF-8" indent="yes"/>
	<xsl:template match="*|@*">
		<xsl:copy>
			<xsl:copy-of select="@*"/>
			<xsl:apply-templates/>
		</xsl:copy>
	</xsl:template>
	<!-- Render Application -->
	<xsl:template match="wa:Application">
		<xsl:variable name="version">1.4.1</xsl:variable>
		<html xmlns="http://www.w3.org/1999/xhtml" xmlns:spry="http://ns.adobe.com/spry">
			<head>
				<title>
					<xsl:value-of select="@title"/>
				</title>
				<meta name="generator">
					<xsl:attribute name="content">Skitsanos WAML (build <xsl:value-of select="$version"/>), http://www.skitsanos.com/content/waml.aspx</xsl:attribute>
				</meta>
				<meta name="waml-version">
					<xsl:attribute name="content">
						<xsl:value-of select="$version"/>
					</xsl:attribute>
				</meta>
				<xsl:if test="@yuiCss='true'">
					<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.2.0/build/button/assets/button.css"/>
					<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.2.0/build/calendar/assets/calendar.css"/>
					<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.2.0/build/container/assets/container.css"/>
					<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.2.0/build/datatable/assets/datatable.css"/>
					<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.2.0/build/menu/assets/menu.css"/>
					<link rel="stylesheet" type="text/css" href="/waml/ajax/yui/assets/tabview.css"/>
					<link rel="stylesheet" type="text/css" href="/waml/ajax/yui/assets/round_tabs.css"/>
					<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.2.0/build/treeview/assets/tree.css"/>
				</xsl:if>
				<xsl:if test="@yuiLibs='true'">
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/utilities/utilities.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/yahoo/yahoo-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/event/event-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/dom/dom-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/animation/animation-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/dragdrop/dragdrop-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/connection/connection-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/autocomplete/autocomplete-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/button/button-beta-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/calendar/calendar-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/container/container_core-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/container/container-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/datasource/datasource-beta-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/datatable/datatable-beta-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/element/element-beta-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/history/history-experimental-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/logger/logger-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/menu/menu-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/slider/slider-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/tabview/tabview-min.js">
						<xsl:comment/>
					</script>
					<script type="text/javascript" src="http://yui.yahooapis.com/2.2.0/build/treeview/treeview-min.js">
						<xsl:comment/>
					</script>
				</xsl:if>
				<link href="/waml/resources/waml.css" type="text/css" rel="stylesheet"/>
				<xsl:apply-templates select="wa:Imports"/>
				<script type="text/javascript" src="/waml/waml.js">
					<xsl:comment/>
				</script>
			</head>
			<body onload="init();">
				<xsl:apply-templates select="wa:Module"/>
			</body>
		</html>
	</xsl:template>
	<!-- Imports -->
	<xsl:template match="wa:Imports">
		<xsl:for-each select="wa:Resource">
			<xsl:if test="@type='js'">
				<script type="text/javascript">
					<xsl:attribute name="src">
						<xsl:value-of select="@url"/>
					</xsl:attribute>
					<xsl:comment/>
				</script>
			</xsl:if>
			<xsl:if test="@type='css'">
				<link rel="stylesheet" type="text/css">
					<xsl:attribute name="href">
						<xsl:value-of select="@url"/>
					</xsl:attribute>
				</link>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
	<!-- Module -->
	<xsl:template match="wa:Module">
		<xsl:apply-templates/>
	</xsl:template>
	<xsl:template match="wa:Loading">
		<div id="HttpProgress">
			<xsl:apply-templates/>
		</div>
	</xsl:template>
</xsl:stylesheet><!-- Stylus Studio meta-information - (c) 2004-2006. Progress Software Corporation. All rights reserved.
<metaInformation>
<scenarios/><MapperMetaTag><MapperInfo srcSchemaPathIsRelative="yes" srcSchemaInterpretAsXML="no" destSchemaPath="" destSchemaRoot="" destSchemaPathIsRelative="yes" destSchemaInterpretAsXML="no"/><MapperBlockPosition></MapperBlockPosition><TemplateContext></TemplateContext><MapperFilter side="source"></MapperFilter></MapperMetaTag>
</metaInformation>
--><!-- Stylus Studio meta-information - (c) 2004-2006. Progress Software Corporation. All rights reserved.
<metaInformation>
<scenarios/><MapperMetaTag><MapperInfo srcSchemaPathIsRelative="yes" srcSchemaInterpretAsXML="no" destSchemaPath="" destSchemaRoot="" destSchemaPathIsRelative="yes" destSchemaInterpretAsXML="no"/><MapperBlockPosition></MapperBlockPosition><TemplateContext></TemplateContext><MapperFilter side="source"></MapperFilter></MapperMetaTag>
</metaInformation>
-->