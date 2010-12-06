var Mint = new Object();
Mint.save = function() 
{
	var now		= new Date();
	var debug	= false; // this is set by php 
	if (window.location.hash == '#Mint:Debug') { debug = true; };
	var path	= 'http://cssing.org.ua/mint/?record' + ((debug)?'&debug&errors':'') + '&key=71586c5359383535536379375070545943323431394732316d';
	
	// Loop through the different plug-ins to assemble the query string
	for (var developer in this) 
	{
		for (var plugin in this[developer]) 
		{
			if (this[developer][plugin] && this[developer][plugin].onsave) 
			{
				path += this[developer][plugin].onsave();
			};
		};
	};
	// Slap the current time on there to prevent caching on subsequent page views in a few browsers
	path += '&'+now.getTime();
	
	// Redirect to the debug page
	if (debug) { window.location.href = path; return; };
	
	var img = new Image();
	img.src = path+'&serve_img';
};
if (!Mint.SI) { Mint.SI = new Object(); }
Mint.SI.Referrer = 
{
	onsave	: function() 
	{
		var encoded = 0;
		if (typeof Mint_SI_DocumentTitle == 'undefined') { Mint_SI_DocumentTitle = document.title; }
		else { encoded = 1; };
		//var referer		= (window.decodeURI)?window.decodeURI(document.referrer):document.referrer;
		referer = document.referrer;
		var resource	= (window.decodeURI)?window.decodeURI(document.URL):document.URL;
   // document.write('&referer=' + escape(referer) + '&resource=' + escape(resource) + '&resource_title=' + escape(Mint_SI_DocumentTitle) + '&resource_title_encoded=' + encoded)
		return '&referer=' + escape(referer) + '&resource=' + escape(resource) + '&resource_title=' + escape(Mint_SI_DocumentTitle) + '&resource_title_encoded=' + encoded;
		
	}
};
if (!Mint.SI) { Mint.SI = new Object(); }
Mint.SI.UserAgent007 = 
{
	flashVersion		: 0,
	resolution			: '0x0',
	detectFlashVersion	: function () 
	{
		var m =16;
		var ua = navigator.userAgent.toLowerCase();
		if (navigator.plugins && navigator.plugins.length) 
		{
			var p = navigator.plugins['Shockwave Flash'];
			if (typeof p == 'object') 
			{
				for (var i=m;i>=3;i--) 
				{
					if (p.description && p.description.indexOf(' ' + i + '.') != -1) { this.flashVersion = i; break; }
				}
			}
		}
		else if (ua.indexOf("msie") != -1 && ua.indexOf("win")!=-1 && parseInt(navigator.appVersion) >= 4 && ua.indexOf("16bit")==-1) 
		{
			var vb = '<scr' + 'ipt language="VBScript"\> \nOn Error Resume Next \nDim obFlash \nFor i = ' + m + ' To 3 Step -1 \n   Set obFlash = CreateObject("ShockwaveFlash.ShockwaveFlash." & i) \n   If IsObject(obFlash) Then \n      Mint.SI.UserAgent007.flashVersion = i \n      Exit For \n   End If \nNext \n<'+'/scr' + 'ipt\> \n';
			document.write(vb);
		}
		else if (ua.indexOf("webtv/2.5") != -1) this.flashVersion = 3;
		else if (ua.indexOf("webtv") != -1) this.flashVersion = 2;
		return this.flashVersion;
	},
	onsave				: function() 
	{
		this.resolution = screen.width+'x'+screen.height;
		return '&resolution=' + this.resolution + '&flash_version=' + this.flashVersion;
	}
};
Mint.SI.UserAgent007.detectFlashVersion();
if (!Mint.SI) { Mint.SI = new Object(); }
Mint.SI.WindowWidth = 
{
	onsave	: function() 
	{
		var width = -1;
		if (window.innerWidth)
		{
			width = window.innerWidth;
		}
		else if (document.getElementsByTagName)
		{
			var html = document.getElementsByTagName('html');
			if (html[0].offsetWidth)
			{
				width = html[0].offsetWidth;
			}
		}
		return '&window_width=' + width;
	}
};
Mint.save();
