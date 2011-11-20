/**
Copyright 2011 Takashi Okamoto. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice, this list of
      conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright notice, this list
      of conditions and the following disclaimer in the documentation and/or other materials
      provided with the distribution.

THIS SOFTWARE IS PROVIDED BY <COPYRIGHT HOLDER> ''AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those of the
authors and should not be interpreted as representing official policies, either expressed
or implied, of Takashi Okamoto.
 */

/**
 * スマートフォン端末のOS、バージョン、端末情報を取得
 * (Android,iPhone/iPad,Windows Phone 7.5に対応)
 * @return device information {os:<os>,version:<os version>,model:<model>,revision:<firm revision>,lang:<locale>}
 */
function getDeviceInfo(){
  r = {};
  userAgent = navigator.userAgent;
  s=$.inArray('(',userAgent);
  e=$.inArray(')',userAgent);
  info=userAgent.substring(s+1,e);
  devinfo=info.split(';');
  $("#ua").val(userAgent);
  if(devinfo[0]=="Linux"){
    t=$.trim(devinfo[2]).split(' ');
    r.os = $.trim(t[0]);
    r.version = $.trim(t[1]);
    r.lang = $.trim(devinfo[3]);
    t=$.trim(devinfo[4]).split(' ');
    r.model=$.trim(t[0]);
    r.revision=$.trim(t[1]);
  } else if (devinfo[0]=='iPhone' || devinfo[0]=='iPad' || devinfo[0]=='iPod'){
    osstr = (devinfo[1]==' U')?devinfo[2]:devinfo[1];
    r.lang = (devinfo[1]==' U')?devinfo[3]:null;
    t = $.trim(osstr).split(' ');
    r.os = 'iOS';
    r.version = $.trim(t[3]).replace(/_/g,'.');
    r.model = devinfo[0];
    revision= null;
  } else if (/^MSIE/.test($.trim(devinfo[1]))) {
    res = $.trim(devinfo[2]).match(/^Windows Phone OS ([\d|\.]+)/);
    alert(res[1]);
    r.version = res[1];
    r.os = 'Windows Phone OS';
    r.model = devinfo[5]+' '+devinfo[6];
  } else {
    // not found
  }
  return r;
}
